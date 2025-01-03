import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {MessageBody, PVoid} from '../../types';
import {IChat, IMessage, IMessageTyping, ITypingUser} from '../../types/chat';
import {INotification} from '../../types/user';
import {IRoom} from '../../types/room';

class SubscriptionApi {
  private roomSubs: StompSubscription[] = [];

  globalSubscribes = async (): PVoid => {
    try {
      await socket.subscribe('/user/info/coin', this.coinCallback);
      await socket.subscribe('/user/info/token', this.tokenCallback);
      await socket.subscribe('/user/error', this.errorCallback);
      await socket.subscribe('/user/notification', this.notificationCallback);
      await socket.subscribe('/user/message', this.userMessageListenCallback);
      await socket.subscribe('/user/message/typing', this.userMessageTypingListenCallback);
      await socket.subscribe('/room/add', this.addRoomCallback);
      await socket.subscribe('/room/delete', this.deleteRoomCallback);
      await socket.subscribe('/room/update', this.updateRoomCallback);
      await socket.subscribe('/live/user');
    } catch (e) {
      console.log(e);
    }
  };

  roomSubscribes = async (): PVoid => {
    try {
      const sessionId = stores.room.sessionId;
      if (sessionId) {
        this.roomSubs = [];
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/playingTrack`, this.playingTrackCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/queue`, this.queueCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/voteResult`, this.voteResultCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/message`, this.publicMessageListenCallback));
        this.roomSubs.push(await socket.subscribe(`/live/room/user/${sessionId}`));
        if (stores.room.isAdmin) {
          this.roomSubs.push(await socket.subscribe('/live/room/admin'));
        }
        stores.room.set('live', true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  roomUnsubscribes = async (): PVoid => {
    try {
      for (const sub of this.roomSubs) {
        await socket.unsubscribe(sub);
      }
      stores.room.set('live', false);
    } catch (e) {
      console.log(e);
    }
  };

  // Send Messages

  getQueue = async (): PVoid => {
    try {
      const sessionId = stores.room.sessionId;
      sessionId && (await socket.sendMessage(`/send/room/${sessionId}/getQueue`));
    } catch (e) {
      console.log(e);
    }
  };

  voteMusic = async (data: IVote): PVoid => {
    try {
      const sessionId = stores.room.sessionId;
      sessionId && (await socket.sendMessage(`/send/room/${sessionId}/voteMusic`, data));
    } catch (e) {
      console.log(e);
    }
  };

  sendMessage = async (data: IMessage): PVoid => {
    try {
      if (data.type === 'PRIVATE' || data.type === 'GROUP') {
        const id = data.receiverId;
        const chat = stores.user.chats.some(c => c.id === id);
        if (chat) {
          stores.user.set('chats', v => v.map(c => (c.id === id ? {...c, messages: [data, ...c.messages]} : c)));
        } else {
          const chat: IChat = {id: id, name: '', type: data.type, typing: false, messages: [data]};
          stores.user.set('chats', v => [chat, ...v]);
        }
      } else if (data.type === 'PUBLIC') {
        stores.room.set('chat', v => [data, ...v]);
      }
      await socket.sendMessage('/send/message', data);
    } catch (e) {
      console.log(e);
    }
  };

  sendMessageTyping = async (data: IMessageTyping): PVoid => {
    try {
      await socket.sendMessage('/send/message/typing', data);
    } catch (e) {
      console.log(e);
    }
  };

  // Callbacks

  private coinCallback = (message: Message) => {
    const coin = JSON.parse(message.body);
    stores.user.set('info', v => ({...v, coin: coin}));
  };

  private tokenCallback = (message: Message) => {
    const token = JSON.parse(message.body);
    stores.user.set('info', v => ({...v, token: token}));
  };

  private errorCallback = (message: Message) => {
    const err: MessageBody = JSON.parse(message.body);
    stores.ui.addMessage(err);
  };

  private notificationCallback = (message: Message) => {
    const notification: INotification = JSON.parse(message.body);
    stores.user.set('notifications', v => [notification, ...v]);
  };

  private userMessageTypingListenCallback = (message: Message) => {
    const t: IMessageTyping = JSON.parse(message.body);
    if (t.type === 'PRIVATE' || t.type === 'GROUP') {
      const id = t.type === 'GROUP' ? t.receiverId : t.senderId;
      const chat = stores.user.chats.find(c => c.id === id);
      if (chat) {
        const user: ITypingUser | null = t.type === 'GROUP' ? {id: t.senderId, typing: t.typing} : null;
        const users = user && chat.typing ? (chat.typing as ITypingUser[]) : [];
        const typing = user ? [user, ...users.filter(u => u.id !== user.id && u.typing)] : t.typing;
        console.log(t, typing);
        stores.user.set('chats', v => v.map(c => (c.id === id ? {...c, typing: typing} : c)));
      }
    }
  };

  private userMessageListenCallback = (message: Message) => {
    const m: IMessage = JSON.parse(message.body);
    const me = m.senderId === stores.user.info.id;
    if (m.type === 'PRIVATE' || m.type === 'GROUP') {
      const id = me || m.type === 'GROUP' ? m.receiverId : m.senderId;
      const chat = stores.user.chats.find(c => c.id === id);
      if (chat) {
        if (me) {
          const some = chat.messages.some(cm => cm.tempId === m.tempId && !cm.id);
          if (some) {
            stores.user.set('chats', v =>
              v.map(c =>
                c.id === id
                  ? {...c, messages: c.messages.map(msg => (msg.tempId === m.tempId && !msg.id ? m : msg))}
                  : c,
              ),
            );
          } else {
            stores.user.set('chats', v => v.map(c => (c.id === id ? {...c, messages: [m, ...c.messages]} : c)));
          }
        } else {
          stores.user.set('chats', v => v.map(c => (c.id === id ? {...c, messages: [m, ...c.messages]} : c)));
        }
      } else {
        const chat: IChat = {id: id, name: '', type: m.type, typing: false, messages: [m]};
        stores.user.set('chats', v => [chat, ...v]);
      }
    }
  };

  private publicMessageListenCallback = (message: Message) => {
    const m: IMessage = JSON.parse(message.body);
    const some = stores.room.chat.some(cm => cm.tempId === m.tempId && !cm.id);
    if (some) {
      stores.room.set('chat', v => v.map(msg => (msg.tempId === m.tempId && !msg.id ? m : msg)));
    } else {
      stores.room.set('chat', v => [m, ...v]);
    }
  };

  private playingTrackCallback = async (message: Message) => {
    const oldId = stores.media.playingTrack.id;
    await media.setPlayingTrack(JSON.parse(message.body));
    if (oldId !== stores.media.playingTrack.id) {
      await subscription.getQueue();
    }
  };

  private queueCallback = (message: Message) => {
    message && media.setQueue(JSON.parse(message.body));
  };

  private voteResultCallback = (message: Message) => {
    message && media.setVoteResult(JSON.parse(message.body));
  };

  private addRoomCallback = (message: Message) => {
    const room: IRoom = JSON.parse(message.body);
    stores.room.set('users', v => [room, ...v]);
  };

  private updateRoomCallback = async (message: Message) => {
    const room: IRoom = JSON.parse(message.body);
    room.liveSong = await media.getPlayingTrack(room.liveSong);
    stores.room.set('users', v => v.map(a => (a.streamerId === room.streamerId ? room : a)));
  };

  private deleteRoomCallback = (message: Message) => {
    const id: string = JSON.parse(message.body);
    stores.room.set('users', v => v.filter(a => a.sessionId !== id));
  };
}

const subscription = new SubscriptionApi();
export default subscription;

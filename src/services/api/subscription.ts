import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {MessageBody, PVoid} from '../../types';
import {IMessage, IMessageTyping, ITypingUser} from '../../types/chat';
import {INotification} from '../../types/user';

class SubscriptionApi {
  private roomSubs: StompSubscription[] = [];

  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/user/info/coin', this.coinCallback);
      await socket.subscribe('/user/info/token', this.tokenCallback);
      await socket.subscribe('/user/error', this.errorCallback);
      await socket.subscribe('/user/notification', this.notificationCallback);
      await socket.subscribe('/user/message', this.userMessageListenCallback);
      await socket.subscribe('/user/message/typing', this.userMessageTypingListenCallback);
      await socket.subscribe('/live/user');
    } catch (e) {
      console.log(e);
    }
  }

  async roomSubscribes(): PVoid {
    try {
      const sessionId = stores.room.getSessionId;
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
  }

  async roomUnsubscribes(): PVoid {
    try {
      for (const sub of this.roomSubs) {
        await socket.unsubscribe(sub);
      }
      stores.room.set('live', false);
    } catch (e) {
      console.log(e);
    }
  }

  // Send Messages

  async getQueue(): PVoid {
    try {
      const sessionId = stores.room.getSessionId;
      sessionId && (await socket.sendMessage(`/send/room/${sessionId}/getQueue`));
    } catch (e) {
      console.log(e);
    }
  }

  async voteMusic(data: IVote): PVoid {
    try {
      const sessionId = stores.room.getSessionId;
      sessionId && (await socket.sendMessage(`/send/room/${sessionId}/voteMusic`, data));
    } catch (e) {
      console.log(e);
    }
  }

  async sendMessage(data: IMessage): PVoid {
    try {
      if (data.type === 'Private' || data.type === 'Group') {
        const id = data.receiverId;
        const chat = stores.user.getChats.some(c => c.id === id);
        if (chat) {
          stores.user.set(
            'chats',
            stores.user.getChats.map(c => (c.id === id ? {...c, messages: [data, ...c.messages]} : c)),
          );
        } else {
          stores.user.set('chats', [
            {id: id, name: '', type: data.type, typing: false, messages: [data]},
            ...stores.user.getChats,
          ]);
        }
      } else if (data.type === 'Public') {
        stores.room.set('chat', [data, ...stores.room.getChat]);
      }
      await socket.sendMessage('/send/message', data);
    } catch (e) {
      console.log(e);
    }
  }

  async sendMessageTyping(data: IMessageTyping): PVoid {
    try {
      await socket.sendMessage('/send/message/typing', data);
    } catch (e) {
      console.log(e);
    }
  }

  // Callbacks

  private coinCallback(message: Message) {
    const coin = JSON.parse(message.body);
    stores.user.set('info', {...stores.user.getInfo, coin: coin});
  }

  private tokenCallback(message: Message) {
    const token = JSON.parse(message.body);
    stores.user.set('info', {...stores.user.getInfo, token: token});
  }

  private errorCallback(message: Message) {
    const err: MessageBody = JSON.parse(message.body);
    stores.ui.addMessage(err);
  }

  private notificationCallback(message: Message) {
    const notification: INotification = JSON.parse(message.body);
    stores.user.set('notifications', [notification, ...stores.user.getNotifications]);
  }

  private userMessageTypingListenCallback(message: Message) {
    const t: IMessageTyping = JSON.parse(message.body);
    if (t.type === 'Private' || t.type === 'Group') {
      const id = t.type === 'Group' ? t.receiverId : t.senderId;
      const chat = stores.user.getChats.find(c => c.id === id);
      if (chat) {
        const user: ITypingUser | null = t.type === 'Group' ? {id: t.senderId, typing: t.typing} : null;
        const users = user && chat.typing ? (chat.typing as ITypingUser[]) : [];
        const typing = user ? [user, ...users.filter(u => u.id !== user.id && u.typing)] : t.typing;
        console.log(t, typing);
        stores.user.set(
          'chats',
          stores.user.getChats.map(c => (c.id === id ? {...c, typing: typing} : c)),
        );
      }
    }
  }

  private userMessageListenCallback(message: Message) {
    const m: IMessage = JSON.parse(message.body);
    const me = m.senderId === stores.user.getInfo.id;
    if (m.type === 'Private' || m.type === 'Group') {
      const id = me || m.type === 'Group' ? m.receiverId : m.senderId;
      const chat = stores.user.chats.find(c => c.id === id);
      if (chat) {
        if (me) {
          const some = chat.messages.some(cm => cm.tempId === m.tempId && !cm.id);
          if (some) {
            stores.user.set(
              'chats',
              stores.user.getChats.map(c =>
                c.id === id
                  ? {...c, messages: c.messages.map(msg => (msg.tempId === m.tempId && !msg.id ? m : msg))}
                  : c,
              ),
            );
          } else {
            stores.user.set(
              'chats',
              stores.user.getChats.map(c => (c.id === id ? {...c, messages: [m, ...c.messages]} : c)),
            );
          }
        } else {
          stores.user.set(
            'chats',
            stores.user.getChats.map(c => (c.id === id ? {...c, messages: [m, ...c.messages]} : c)),
          );
        }
      } else {
        stores.user.set('chats', [
          {id: id, name: '', type: m.type, typing: false, messages: [m]},
          ...stores.user.getChats,
        ]);
      }
    }
  }

  private publicMessageListenCallback(message: Message) {
    const m: IMessage = JSON.parse(message.body);
    const some = stores.room.chat.some(cm => cm.tempId === m.tempId && !cm.id);
    if (some) {
      stores.room.set(
        'chat',
        stores.room.getChat.map(msg => (msg.tempId === m.tempId && !msg.id ? m : msg)),
      );
    } else {
      stores.room.set('chat', [m, ...stores.room.getChat]);
    }
  }

  private playingTrackCallback(message: Message) {
    const oldId = stores.media.getPlayingTrack.id;
    media.setPlayingTrack(JSON.parse(message.body)).then(async () => {
      if (oldId !== stores.media.getPlayingTrack.id) {
        await subscription.getQueue();
      }
    });
  }

  private queueCallback(message: Message) {
    message && media.setQueue(JSON.parse(message.body));
  }

  private voteResultCallback(message: Message) {
    message && media.setVoteResult(JSON.parse(message.body));
  }
}

const subscription = new SubscriptionApi();
export default subscription;

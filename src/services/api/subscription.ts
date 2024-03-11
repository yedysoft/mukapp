import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {MessageBody, PVoid} from '../../types';
import {IChat, IMessage, IMessageTyping, ITypingUser} from '../../types/chat';
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
        this.roomSubs.push(await socket.subscribe(`/live/room/user/${sessionId}`));
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/message`, this.publicMessageListenCallback));
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
    if (t.type === 'Private') {
      const chat = stores.user.getChats.find(c => c.id === t.senderId);
      if (chat) {
        stores.user.do(() => (chat.typing = t.typing));
      }
    } else if (t.type === 'Group') {
      const chat = stores.user.getChats.find(c => c.id === t.receiverId);
      if (chat) {
        stores.user.do(() => {
          const user: ITypingUser = {id: t.senderId, typing: t.typing};
          let users = chat.typing ? (chat.typing as ITypingUser[]) : [];
          users = users.filter(u => u.id !== user.id && u.typing);
          users.push(user);
          chat.typing = users;
        });
      }
    }
  }

  private userMessageListenCallback(message: Message) {
    const newMessage: IMessage = JSON.parse(message.body);
    if (
      (newMessage.type === 'Private' || newMessage.type === 'Group') &&
      (stores.user.getInfo.id === newMessage.receiverId || stores.user.getInfo.id === newMessage.senderId)
    ) {
      const id = stores.user.getInfo.id === newMessage.senderId ? newMessage.receiverId : newMessage.senderId;
      const chat = stores.user.getChats.find(c => c.id === id && c.type === newMessage.type);
      let newChats: IChat[] | null = null;
      if (chat) {
        newChats = stores.user.getChats.map((c, _) =>
          c.id === id && c.type === newMessage.type ? {...c, messages: [newMessage, ...c.messages]} : c,
        );
      } else if (stores.user.getInfo.id === newMessage.receiverId || stores.user.getInfo.id === newMessage.senderId) {
        newChats = [
          {
            id: id,
            name: '',
            type: newMessage.type,
            typing: false,
            messages: [newMessage],
          },
          ...stores.user.getChats,
        ];
      }
      newChats && stores.user.set('chats', newChats);
    } else if (newMessage.type === 'Typing' && stores.user.getInfo.id === newMessage.receiverId) {
      const newChats = stores.user.getChats.map((c, _) =>
        c.id === newMessage.senderId ? {...c, isTyping: newMessage.content === 'true'} : c,
      );
      stores.user.set('chats', newChats);
    }
  }

  private publicMessageListenCallback(message: Message) {
    const newMessage: IMessage = JSON.parse(message.body);
    stores.room.set('chat', [newMessage, ...stores.room.getChat]);
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
    media.setQueue(JSON.parse(message.body));
  }

  private voteResultCallback(message: Message) {
    media.setVoteResult(JSON.parse(message.body));
  }
}

const subscription = new SubscriptionApi();
export default subscription;

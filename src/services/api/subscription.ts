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
          const users = chat.typing ? (chat.typing as ITypingUser[]) : [];
          chat.typing = [user, ...users.filter(u => u.id !== user.id && u.typing)];
        });
      }
    }
  }

  private userMessageListenCallback(message: Message) {
    const m: IMessage = JSON.parse(message.body);
    const me = m.senderId === stores.user.getInfo.id;
    if (m.type === 'Private') {
      const id = me ? m.receiverId : m.senderId;
      const chat = stores.user.getChats.find(c => c.id === id);
      if (chat) {
        stores.user.do(() => {
          chat.messages.unshift(m);
        });
      }
    } else if (m.type === 'Group') {
      const chat = stores.user.getChats.find(c => c.id === m.receiverId);
      if (chat) {
        stores.user.do(() => {
          const user: ITypingUser = {id: t.senderId, typing: t.typing};
          const users = chat.typing ? (chat.typing as ITypingUser[]) : [];
          chat.typing = [user, ...users.filter(u => u.id !== user.id && u.typing)];
        });
      }
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

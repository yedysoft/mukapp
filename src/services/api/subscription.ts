import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {MessageBody, PVoid} from '../../types';
import {IMessage} from '../../types/chat';

export class SubscriptionApi {
  private roomSubs: StompSubscription[] = [];

  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/user/info/coin', this.coinCallback);
      await socket.subscribe('/user/info/token', this.tokenCallback);
      await socket.subscribe('/user/error', this.errorCallback);
      await socket.subscribe('/message/listen', this.messageListenCallback);
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
        this.roomSubs.push(await socket.subscribe(`/live/room/user/${stores.user.info.id}`));
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

  //Düzenlenecekkk
  private messageListenCallback(message: Message) {
    const newMessage: IMessage = JSON.parse(message.body);
    if (newMessage.type === 'Public') {
      console.log(newMessage);
      stores.room.set('chat', [...stores.room.getChat, newMessage]);
    } else if (newMessage.type === 'Private' || newMessage.type === 'Group') {
      const newChats = stores.user.getChats.map((c, _) =>
        c.id === newMessage.receiverId && c.type === newMessage.type
          ? {...c, messages: [...c.messages, newMessage]}
          : c,
      );
      stores.user.set('chats', newChats);
    }
  }

  private playingTrackCallback(message: Message) {
    const oldId = stores.media.getPlayingTrack.id;
    media.setPlayingTrack(JSON.parse(message.body)).then(async () => {
      if (oldId !== stores.media.getPlayingTrack.id) {
        await subscription.getQueue();
      }
    });
    media.setPlayingTrack(JSON.parse(message.body));
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

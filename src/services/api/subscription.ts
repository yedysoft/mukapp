import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {MessageType} from '../../types/enums';

export class SubscriptionApi {
  private roomSubs: StompSubscription[] = [];

  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/user/info/coin', this.coinCallback);
      await socket.subscribe('/user/info/token', this.tokenCallback);
      await socket.subscribe('/user/error', this.errorCallback);
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
        this.roomSubs.push(await socket.subscribe(`/room/${sessionId}/publicChat`, this.publicChatCallback));
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

  async sendPublicMessage(data: IMessage[]): PVoid {
    try {
      const sessionId = stores.room.getSessionId;
      sessionId && (await socket.sendMessage(`/send/room/${sessionId}/publicMessage`, data));
    } catch (e) {
      console.log(e);
    }
  }

  async sendPrivateMessage(data: IMessage[]): PVoid {
    try {
      const userId = stores.user.getInfo.id;
      userId && (await socket.sendMessage(`/send/message/${userId}/private`, data));
    } catch (e) {
      console.log(e);
    }
  }

  async sendGroupMessage(data: IMessage[]): PVoid {
    try {
      const groupId = stores.user.getInfo.id;
      groupId && (await socket.sendMessage(`/send/room/${groupId}/group`, data));
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
    const err: ErrorBody = JSON.parse(message.body);
    stores.ui.addErrors(err);
  }

  private privateChatCallback(message: Message) {
    const newMessage: IMessage[] = JSON.parse(message.body);
    const messages: IMessage[] = GiftedChat.append(stores.room.getChat, newMessage);
    stores.user.set('chats', [
      ...stores.user.getChats,
      {id: '', name: '', type: MessageType.Private, messages: messages},
    ]);
  }

  private publicChatCallback(message: Message) {
    const newMessage: IMessage[] = JSON.parse(message.body);
    stores.room.set('chat', GiftedChat.append(stores.room.getChat, newMessage));
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

import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';
import media from './media';
import {IVote} from '../../types/media';
import {IMessage} from 'react-native-gifted-chat';

export class SubscriptionApi {
  private roomSubs: StompSubscription[] = [];

  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/info/coin', this.coinCallback);
      await socket.subscribe('/error', this.errorCallback);
      await socket.subscribe('/live/session');
    } catch (e) {
      console.log(e);
    }
  }

  async roomSubscribes(): PVoid {
    try {
      const streamerId = stores.room.getStreamerId;
      if (streamerId) {
        this.roomSubs = [];
        this.roomSubs.push(await socket.subscribe(`/room/${streamerId}/publicChat`, this.publicChatCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${streamerId}/playingTrack`, this.playingTrackCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${streamerId}/queue`, this.queueCallback));
        this.roomSubs.push(await socket.subscribe(`/room/${streamerId}/voteResult`, this.voteResultCallback));
        this.roomSubs.push(await socket.subscribe('/live/room/admin'));
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
      const streamerId = stores.room.getStreamerId;
      streamerId && (await socket.sendMessage(`/app/room/${streamerId}/getQueue`));
    } catch (e) {
      console.log(e);
    }
  }

  async voteMusic(data: IVote): PVoid {
    try {
      const streamerId = stores.room.getStreamerId;
      streamerId && (await socket.sendMessage(`/app/room/${streamerId}/voteMusic`, data));
    } catch (e) {
      console.log(e);
    }
  }

  async sendPublicMessage(data: IMessage): PVoid {
    try {
      const streamerId = stores.room.getStreamerId;
      streamerId && (await socket.sendMessage(`/app/room/${streamerId}/sendPublicMessage`, data));
    } catch (e) {
      console.log(e);
    }
  }

  // Callbacks

  private coinCallback(message: Message) {
    const coin = JSON.parse(message.body);
    stores.user.set('info', {...stores.user.getInfo, coin: coin});
  }

  private errorCallback(message: Message) {
    console.log('errorCallback', message.body);
  }

  private publicChatCallback(message: Message) {
    console.log('publicChatCallback', message.body);
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

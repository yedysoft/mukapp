import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';
import {StompSubscription} from '@stomp/stompjs';

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
        await socket.subscribe(`/room/${streamerId}/playingTrack`, this.playingTrackCallback);
        await socket.subscribe(`/room/${streamerId}/queue`, this.queueCallback);
        await socket.subscribe(`/room/${streamerId}/voteResult`, this.voteResultCallback);
        await socket.subscribe('/live/room/admin');
        stores.room.set('live', true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async roomUnsubscribes(): PVoid {
    try {
      stores.room.set('live', false);
    } catch (e) {
      console.log(e);
    }
  }

  private coinCallback(message: Message) {
    const coin = JSON.parse(message.body);
    stores.user.set('info', {...stores.user.getInfo, coin: coin});
    console.log('coinCallback', coin);
  }

  private errorCallback(message: Message) {
    console.log('errorCallback', message.body);
  }

  private publicChatCallback(message: Message) {
    console.log('publicChatCallback', message.body);
  }

  private playingTrackCallback(message: Message) {
    console.log('playingTrackCallback', message.body);
  }

  private queueCallback(message: Message) {
    console.log('queueCallback', message.body);
  }

  private voteResultCallback(message: Message) {
    console.log('voteResultCallback', message.body);
  }
}

const subscription = new SubscriptionApi();
export default subscription;

import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';

export class SubscriptionApi {
  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/info/coin', this.coinCallback);
      await socket.subscribe('/error', this.errorCallback);
    } catch (e) {
      console.log(e);
    }
  }

  async roomSubscribes(streamerId: string): PVoid {
    try {
      await socket.subscribe(`/room/${streamerId}/playingTrack`, this.playingTrackCallback);
      await socket.subscribe('/live/room/admin');
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

  private playingTrackCallback(message: Message) {
    console.log('playingTrackCallback', message.body);
  }
}

const subscription = new SubscriptionApi();
export default subscription;

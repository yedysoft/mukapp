import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';

export class SubscriptionApi {
  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('/info/coin', this.coinCallback);
      await socket.subscribe('/error', this.errorCallback);
    } catch (e) {
      console.log(e);
    }
  }

  private coinCallback(message: Message) {
    console.log('coinCallback', message.body);
  }

  private errorCallback(message: Message) {
    console.log('errorCallback', message.body);
  }
}

const subscription = new SubscriptionApi();
export default subscription;

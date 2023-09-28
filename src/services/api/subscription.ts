import socket from './socket';
import {Message} from '@stomp/stompjs/esm6';
import {stores} from '../../stores';

export class SubscriptionApi {
  async globalSubscribes(): PVoid {
    try {
      const coinCallback = (message: Message) => {
        const coin = JSON.parse(message.body);
        stores.user.set('info', {...stores.user.getInfo, coin: coin});
        console.log('coinCallback', coin);
      };

      const errorCallback = (message: Message) => {
        console.log('errorCallback', message.body);
      };

      await socket.subscribe('/info/coin', coinCallback);
      await socket.subscribe('/error', errorCallback);
    } catch (e) {
      console.log(e);
    }
  }
}

const subscription = new SubscriptionApi();
export default subscription;

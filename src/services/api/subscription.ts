import socket from './socket';

export class SubscriptionApi {
  async globalSubscribes(): PVoid {
    try {
      await socket.subscribe('', coinCallback);
    } catch (e) {
      console.log(e);
    }
  }

  private coinCallback() {}
}

const subscription = new SubscriptionApi();
export default subscription;

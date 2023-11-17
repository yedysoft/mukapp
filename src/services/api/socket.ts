import * as StompJs from '@stomp/stompjs';
import {messageCallbackType, StompHeaders, StompSubscription} from '@stomp/stompjs';
import {wsUrl} from '../../../config';
import {PVoid} from '../../types';

export class SocketApi {
  public subscribes: {[key: string]: StompSubscription};
  private client: StompJs.Client;

  constructor() {
    this.subscribes = {};
    this.client = new StompJs.Client({
      brokerURL: wsUrl,
      forceBinaryWSFrames: true,
      //appendMissingNULLonIncoming: true,
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: str =>
        !str.includes('Received data') && !str.includes('playingTrack') && console.debug('Socket Debug:', str),
      onWebSocketError: event => console.log('onWebSocketError:', event),
      onStompError: event => console.log('onStompError:', event),
      onWebSocketClose: event => console.log('onWebSocketClose:', event),
    });
  }

  async connect(): PVoid {
    await this.disconnect();
    return new Promise<void>(resolve => {
      this.client.onConnect = () => {
        resolve();
      };
      this.client.activate();
    });
  }

  async disconnect(): PVoid {
    Object.keys(this.subscribes).forEach(k => this.subscribes[k].unsubscribe());
    await this.client.deactivate({force: true});
    this.subscribes = {};
  }

  async subscribe(destination: string, callback?: messageCallbackType, subId?: string) {
    if (!(destination in this.subscribes)) {
      await this.checkConnect();
      if (this.client.connected) {
        const headers: StompHeaders = {};
        if (subId) {
          headers.id = subId;
        }
        const sub: StompSubscription = this.client.subscribe(destination, <messageCallbackType>callback, headers);
        this.subscribes[destination] = sub;
        return sub;
      }
    }
    return this.subscribes[destination];
  }

  async unsubscribe(sub: StompSubscription): PVoid {
    await this.checkConnect();
    if (this.client.connected) {
      sub.unsubscribe();
      const key = Object.keys(this.subscribes).find(k => this.subscribes[k].id === sub.id);
      if (key) {
        delete this.subscribes[key];
      }
    }
  }

  async sendMessage(destination: string, msg?: any): PVoid {
    await this.checkConnect();
    if (this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(msg),
      });
    }
  }

  private async checkConnect(): PVoid {
    if (!this.client.connected) {
      await this.connect();
    }
  }
}

const socket = new SocketApi();
export default socket;

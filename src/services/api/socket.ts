import * as StompJs from '@stomp/stompjs';
import {messageCallbackType, StompHeaders, StompSubscription, Versions} from '@stomp/stompjs';
import {wsUrl} from '../../../config';
import {PVoid} from '../../types';
import {stores} from '../../stores';

const WS = WebSocket as any;
class SocketApi {
  public subscribes: {[key: string]: StompSubscription & {callback?: messageCallbackType; subId?: string}};
  private client: StompJs.Client;

  constructor() {
    this.subscribes = {};
    this.client = new StompJs.Client({
      webSocketFactory: () =>
        new WS(wsUrl, Versions.default.protocolVersions(), {
          headers: {Origin: 'https://muk.yedysoft.com', Authorization: `Bearer ${stores.auth.getAuthToken}`},
        }),
      forceBinaryWSFrames: true,
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: str =>
        !str.includes('Received data') && !str.includes('playingTrack') && console.debug('Socket Debug:', str),
      onWebSocketError: event => console.log('onWebSocketError:', event),
      onStompError: event => console.log('onStompError:', event),
      onWebSocketClose: event => console.log('onWebSocketClose:', event),
    });
  }

  connect = async (): PVoid => {
    return new Promise<void>(resolve => {
      this.client.onConnect = async () => {
        for (const [key, sub] of Object.entries(this.subscribes)) {
          await this.subscribe(key, sub.callback, sub.subId, true);
        }
        resolve();
      };
      if (this.client.active) {
        resolve();
      } else {
        this.client.activate();
      }
    });
  };

  disconnect = async (): PVoid => {
    Object.values(this.subscribes).forEach(s => s.unsubscribe);
    await this.client.deactivate({force: true});
    this.subscribes = {};
  };

  subscribe = async (destination: string, callback?: messageCallbackType, subId?: string, force?: boolean) => {
    if (!(destination in this.subscribes) || force) {
      await this.checkConnect();
      if (this.client.connected) {
        const headers: StompHeaders = {};
        if (subId) {
          headers.id = subId;
        }
        const sub: StompSubscription = this.client.subscribe(destination, <messageCallbackType>callback, headers);
        this.subscribes[destination] = {...sub, callback: callback, subId: subId};
        return sub;
      }
    }
    return this.subscribes[destination];
  };

  unsubscribe = async (sub: StompSubscription): PVoid => {
    await this.checkConnect();
    if (this.client.connected) {
      sub.unsubscribe();
      const key = Object.keys(this.subscribes).find(k => this.subscribes[k].id === sub.id);
      if (key) {
        delete this.subscribes[key];
      }
    }
  };

  sendMessage = async (destination: string, msg?: any): PVoid => {
    await this.checkConnect();
    if (this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(msg),
      });
    }
  };

  private checkConnect = async (): PVoid => {
    if (!this.client.connected) {
      await this.connect();
    }
  };
}

const socket = new SocketApi();
export default socket;

import StompJs, {StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {restUrl} from '../../../config';
import {messageCallbackType} from '@stomp/stompjs/src/types';

export class SocketApi {
  public onConnected: PureFunc;
  public connected: PureFunc;
  public onDisconnected: PureFunc;
  public subscribes: {[key: string]: StompSubscription};
  public client: StompJs.Client;

  constructor() {
    const noOp = () => {};
    this.connected = noOp;
    this.onConnected = noOp;
    this.onDisconnected = noOp;
    this.subscribes = {};
    this.client = new StompJs.Client({
      reconnectDelay: 4000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS(restUrl + '/ws'),
      debug: str => console.log(str),
      onWebSocketError: () => console.log('onWebSocketError'),
      onStompError: () => console.log('onStompError'),
      onWebSocketClose: event => console.log(event),
      onConnect: () => {
        this.connected();
        this.onConnected();
      },
      onDisconnect: () => this.onDisconnected,
    });
  }

  public connect = async (): PVoid => {
    return new Promise<void>(resolve => {
      this.client.onConnect = () => {
        console.log('connected');
        resolve();
      };
      this.client.activate();
    });
  };

  public disconnect = async (): PVoid => {
    Object.keys(this.subscribes).forEach(k => this.subscribes[k].unsubscribe());
    await this.client.deactivate({force: true});
    this.subscribes = {};
  };

  public subscribe = (destination: string, callback: messageCallbackType): StompSubscription | undefined => {
    if (!(destination in this.subscribes)) {
      this.checkConnect();
      if (this.client.connected) {
        const sub: StompSubscription = this.client.subscribe(destination, callback);
        this.subscribes[destination] = sub;
        return sub;
      }
    } else {
      return this.subscribes[destination];
    }
    return undefined;
  };

  public unsubscribe = (sub: StompSubscription): void => {
    this.checkConnect();
    if (this.client.connected) {
      sub.unsubscribe();
      const key = Object.keys(this.subscribes).find(k => this.subscribes[k].id === sub.id);
      if (key) {
        delete this.subscribes[key];
      }
    }
  };

  public sendMessage = (destination: string, msg?: any): void => {
    this.checkConnect();
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

import {AuthApi} from './auth';
import {SocketApi} from './socket';
import {HelperApi} from './helper';

export class ApiService implements IService {
  private inited = false;

  auth: AuthApi;
  socket: SocketApi;
  helper: HelperApi;

  constructor() {
    this.auth = new AuthApi();
    this.socket = new SocketApi();
    this.helper = new HelperApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      this.socket.connect();
      this.inited = true;
    }
  };
}

import {AuthApi} from './auth';
import {SocketApi} from './socket';
import {HelperApi} from './helper';
import {UserApi} from './user';

export class ApiService implements IService {
  private inited = false;

  socket: SocketApi;
  helper: HelperApi;
  auth: AuthApi;
  user: UserApi;

  constructor() {
    this.socket = new SocketApi();
    this.helper = new HelperApi();
    this.auth = new AuthApi();
    this.user = new UserApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      this.socket.connect();
      this.inited = true;
    }
  };
}

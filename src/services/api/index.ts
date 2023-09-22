import auth, {AuthApi} from './auth';
import socket, {SocketApi} from './socket';
import helper, {HelperApi} from './helper';
import user, {UserApi} from './user';

export class ApiService implements IService {
  private inited = false;

  helper: HelperApi;
  socket: SocketApi;
  auth: AuthApi;
  user: UserApi;

  constructor() {
    this.socket = socket;
    this.helper = helper;
    this.auth = auth;
    this.user = user;
  }

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true;
    }
  };
}

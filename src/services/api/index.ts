import auth, {AuthApi} from './auth';
import socket, {SocketApi} from './socket';
import helper, {HelperApi} from './helper';
import user, {UserApi} from './user';
import media, {MediaApi} from './media';
import subscription, {SubscriptionApi} from './subscription';

export class ApiService implements IService {
  private inited = false;

  helper: HelperApi;
  socket: SocketApi;
  auth: AuthApi;
  user: UserApi;
  media: MediaApi;
  subscription: SubscriptionApi;

  constructor() {
    this.socket = socket;
    this.helper = helper;
    this.auth = auth;
    this.user = user;
    this.media = media;
    this.subscription = subscription;
  }

  async init(): PVoid {
    if (!this.inited) {
      this.inited = true;
    }
  }
}

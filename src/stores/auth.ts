import {BaseStore} from './base';
import {IAuthsType} from '../types/enums';

class AuthStore extends BaseStore<AuthStore> {
  loggedIn = false;
  isNeededPassChange = false;
  authToken = '';
  auths: IAuthsType[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, AuthStore.name, ['authToken']);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  get getAuthToken() {
    return this.authToken;
  }

  get getEncodedAuthToken() {
    return encodeURIComponent(this.authToken);
  }
}

const auth = new AuthStore();
export default auth;

import {BaseStore} from './base';

class AuthStore extends BaseStore<AuthStore> {
  loggedIn = false;
  authToken = '';

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

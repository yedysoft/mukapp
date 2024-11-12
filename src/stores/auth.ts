import {BaseStore} from './base';
import {IAuths} from '../types/auth';

class AuthStore extends BaseStore<AuthStore> {
  loggedIn = false;
  isNeededPassChange = false;
  authToken = '';
  auths: IAuths[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, AuthStore.name, ['authToken']);
  }
}

const auth = new AuthStore();
export default auth;

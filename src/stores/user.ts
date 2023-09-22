import {IUserInfo} from '../types/auth';
import {BaseStore} from './base';

export class UserStore extends BaseStore<UserStore> {
  userInfo: IUserInfo = {id: '-1', coin: 0};

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UserStore.name, []);
  }

  get getUserInfo() {
    return this.userInfo;
  }
}

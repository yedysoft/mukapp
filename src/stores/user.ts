import {BaseStore} from './base';
import {IInfo} from '../types/user';

export class UserStore extends BaseStore<UserStore> {
  info: IInfo = {id: null, coin: 0, image: ''};

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UserStore.name, []);
  }

  get getInfo() {
    return this.info;
  }
}

const user = new UserStore();
export default user;

import {BaseStore} from './base';
import {IChat, IInfo} from '../types/user';

export class UserStore extends BaseStore<UserStore> {
  info: IInfo = {id: null, userName: '', image: '', name: '', surname: '', coin: 0, token: 0};
  chats: IChat[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UserStore.name, []);
  }

  get getInfo() {
    return this.info;
  }

  get getChats() {
    return this.chats;
  }
}

const user = new UserStore();
export default user;

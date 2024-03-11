import {BaseStore} from './base';
import {IBlockedUser, IFollowUser, IInfo, INotification, ISearchUser} from '../types/user';
import defaults from '../utils/defaults';
import {IQueueTrack} from '../types/media';
import {IChat} from '../types/chat';
import {services} from '../services';

class UserStore extends BaseStore<UserStore> {
  info: IInfo = defaults.info;
  infos: IInfo[] = [];
  notifications: INotification[] = [];
  chats: IChat[] = [];
  searched: ISearchUser[] = [];
  follows: IFollowUser[] = [];
  followers: IFollowUser[] = [];
  blockedUsers: IBlockedUser[] = [];
  topVoted: IQueueTrack[] = [];
  countTopVoted = 0;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UserStore.name, ['notifications', 'chats']);
  }

  get getInfo() {
    return this.info;
  }

  getInfosById(id: string): IInfo {
    const i = this.infos.find(i => i.id === id);
    if (i) {
      return i;
    } else {
      services.api.user.getInfoByIds([id]);
      return defaults.info;
    }
  }

  addOrUpdateInfo(info: IInfo) {
    const a = this.infos.find(i => i.id === info.id);
    const newList = a ? this.infos.map(i => (i.id === info.id ? info : i)) : [...this.infos, info];
    this.set('infos', newList);
  }

  get getNotifications() {
    return this.notifications;
  }

  get getChats() {
    return this.chats;
  }

  get getSearched() {
    return this.searched;
  }

  get getFollows() {
    return this.follows;
  }

  get getFollowers() {
    return this.followers;
  }

  get getBlockedUsers() {
    return this.blockedUsers;
  }

  get getTopVoted() {
    return this.topVoted;
  }

  get getCountTopVoted() {
    return this.countTopVoted;
  }
}

const user = new UserStore();
export default user;

import {BaseStore} from './base';
import {IBlockedUser, IFollowUser, IInfo, INotification, ISearchUser} from '../types/user';
import defaults from '../utils/defaults';
import {IQueueTrack} from '../types/media';
import {IChat, IQuotedMessage} from '../types/chat';

class UserStore extends BaseStore<UserStore> {
  info: IInfo = defaults.info;
  notifications: INotification[] = [];
  chats: IChat[] = [];
  quotedMessage: IQuotedMessage | null = null;
  searched: ISearchUser[] = [];
  follows: IFollowUser[] = [];
  followers: IFollowUser[] = [];
  blockedUsers: IBlockedUser[] = [];
  topVoted: IQueueTrack[] = [];
  countTopVoted = 0;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UserStore.name, []);
  }

  get getInfo() {
    return this.info;
  }

  get getNotifications() {
    return this.notifications;
  }

  get getChats() {
    return this.chats ?? [];
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

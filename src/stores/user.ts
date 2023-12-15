import {BaseStore} from './base';
import {IBlockedUser, IFollowRequest, IFollowUser, IInfo, ISearchUser} from '../types/user';
import defaults from '../utils/defaults';
import {IQueueTrack} from '../types/media';
import {IChat} from '../types/chat';

export class UserStore extends BaseStore<UserStore> {
  info: IInfo = defaults.info;
  otherUser: IInfo = defaults.info;
  chats: IChat[] = [];
  searched: ISearchUser[] = [];
  follows: IFollowUser[] = [];
  followers: IFollowUser[] = [];
  followRequests: IFollowRequest[] = [];
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

  get getFollowRequests() {
    return this.followRequests;
  }

  get getBlockedUsers() {
    return this.blockedUsers;
  }

  get getOtherUser() {
    return this.otherUser;
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

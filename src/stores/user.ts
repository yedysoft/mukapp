import {BaseStore} from './base';
import {IBlockedUser, IChat, IFollowRequest, IFollowUser, IInfo, ISearchUser} from '../types/user';
import defaults from '../utils/defaults';

export class UserStore extends BaseStore<UserStore> {
  info: IInfo = defaults.info;
  otherUser: IInfo = defaults.info;
  chats: IChat[] = [];
  searched: ISearchUser[] = [];
  follows: IFollowUser[] = [];
  followers: IFollowUser[] = [];
  followRequests: IFollowRequest[] = [];
  blockedUsers: IBlockedUser[] = [];

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
}

const user = new UserStore();
export default user;

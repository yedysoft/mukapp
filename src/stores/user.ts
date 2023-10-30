import {BaseStore} from './base';
import {IBlockedUser, IChat, IFollowRequest, IFollowUser, IInfo, ISearchUser} from '../types/user';

export class UserStore extends BaseStore<UserStore> {
  info: IInfo = {id: null, userName: '', image: '', name: '', surname: '', coin: 0, token: 0};
  otherUser: IInfo = {id: null, userName: '', image: '', name: '', surname: '', coin: 0, token: 0};
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

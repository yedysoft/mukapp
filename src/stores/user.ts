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
    this.makeObservableAndPersistable(this, UserStore.name);
  }
}

const user = new UserStore();
export default user;

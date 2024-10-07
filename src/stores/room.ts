import {BaseStore} from './base';
import user from './user';
import {IRoom, IRoomConfig, IRoomLeaderboard} from '../types/room';
import {IMessage} from '../types/chat';
import defaults from '../utils/defaults';

class RoomStore extends BaseStore<RoomStore> {
  streamerId: string | null = null;
  sessionId: string | null = null;
  live = false;
  chat: IMessage[] = [];
  config: IRoomConfig = defaults.config;
  places: IRoom[] = [];
  users: IRoom[] = [];
  leaderboard: IRoomLeaderboard[] = [];
  isRoomPageOn = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, RoomStore.name, []);
  }

  get isAdmin() {
    return this.streamerId && user.getInfo.id && this.streamerId === user.getInfo.id;
  }

  get getSessionId() {
    return this.sessionId;
  }

  get isLive() {
    return this.live;
  }

  get getChat() {
    return this.chat;
  }

  get getConfig() {
    return this.config;
  }

  get getPlaces() {
    return this.places;
  }

  get getUsers() {
    return this.users;
  }

  get getLeaderboard() {
    return this.leaderboard;
  }
}

const room = new RoomStore();
export default room;

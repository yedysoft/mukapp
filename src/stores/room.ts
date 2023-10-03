import {BaseStore} from './base';
import user from './user';
import {IRoom, IRoomConfig} from '../types/room';

export class RoomStore extends BaseStore<RoomStore> {
  streamerId: string | null = null;
  sessionId: string | null = null;
  live = false;
  config: IRoomConfig | null = null;
  places: IRoom[] = [];
  users: IRoom[] = [];

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

  get getConfig() {
    return this.config;
  }

  get getPlaces() {
    return this.places;
  }

  get getUsers() {
    return this.users;
  }
}

const room = new RoomStore();
export default room;

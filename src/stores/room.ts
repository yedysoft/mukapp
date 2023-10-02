import {BaseStore} from './base';
import user from './user';

export class RoomStore extends BaseStore<RoomStore> {
  streamerId: string | null = null;
  sessionId: string | null = null;
  live = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, RoomStore.name, []);
  }

  get isAdmin() {
    return this.streamerId && user.getInfo.id && this.streamerId === user.getInfo.id;
  }

  get getStreamerId() {
    return this.streamerId;
  }

  get getSessionId() {
    return this.sessionId;
  }

  get isLive() {
    return this.live;
  }
}

const room = new RoomStore();
export default room;

import {BaseStore} from './base';
import {stores} from './index';

export class RoomStore extends BaseStore<RoomStore> {
  streamerId: string | null = null;
  live = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, RoomStore.name, []);
  }

  get isAdmin() {
    return this.streamerId && stores.user.info.id && this.streamerId === stores.user.info.id;
  }

  get getStreamerId() {
    return this.streamerId;
  }

  get isLive() {
    return this.live;
  }
}

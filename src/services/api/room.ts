import subscription from './subscription';
import {stores} from '../../stores';

export class RoomApi {
  async createRoom(): PVoid {
    try {
      await this.openRoom('', '');
    } catch (e) {
      console.log(e);
    }
  }

  async openRoom(sessionId: string, streamerId: string): PVoid {
    try {
      stores.room.setMany({sessionId: sessionId, streamerId: streamerId});
      await subscription.roomSubscribes();
    } catch (e) {
      console.log(e);
    }
  }

  async closeRoom(): PVoid {
    try {
      stores.room.setMany({sessionId: null, streamerId: null});
      await subscription.roomUnsubscribes();
      stores.room.set('streamerId', null);
    } catch (e) {
      console.log(e);
    }
  }
}

const room = new RoomApi();
export default room;

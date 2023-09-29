import subscription from './subscription';
import {stores} from '../../stores';

export class RoomApi {
  async openRoom(): PVoid {
    try {
      stores.room.set('streamerId', stores.user.getInfo.id);
      await subscription.roomSubscribes();
    } catch (e) {
      console.log(e);
    }
  }

  async closeRoom(): PVoid {
    try {
      stores.room.set('streamerId', null);
      await subscription.roomSubscribes();
    } catch (e) {
      console.log(e);
    }
  }
}

const room = new RoomApi();
export default room;

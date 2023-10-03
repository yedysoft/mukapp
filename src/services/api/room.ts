import subscription from './subscription';
import {stores} from '../../stores';
import axiosIns from '../axiosIns';
import {IRoomConfig} from '../../types/room';

export class RoomApi {
  async createRoom(config: IRoomConfig): PVoid {
    try {
      stores.user.getInfo.id && (config.roomId = stores.user.getInfo.id);
      await this.saveConfig(config);
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

  async getRooms(role: string): PVoid {
    try {
      const response = await axiosIns.get(`/user/getPlaces/${role}`);
      stores.room.set(role === 'PLACE' ? 'places' : 'users', response.data);
    } catch (e: any) {
      console.log(e);
    }
  }

  async setConfig(): PVoid {
    try {
      const response = await axiosIns.get(`/room-config/getByRoomId/${stores.user.info.id}`);
      stores.room.set('config', response.data);
    } catch (e: any) {
      console.log(e);
    }
  }

  async saveConfig(config: IRoomConfig): PVoid {
    try {
      const response = await axiosIns.post('/room-config/saveConfig', config);
      stores.room.set('config', response.data);
    } catch (e: any) {
      console.log(e);
    }
  }
}

const room = new RoomApi();
export default room;

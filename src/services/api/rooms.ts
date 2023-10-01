import {stores} from '../../stores';
import axiosIns from '../axiosIns';

export class RoomsApi {
  async getRooms(role: string): PVoid {
    try {
      const response = await axiosIns.get(`/user/getPlaces/${role}`);
      stores.rooms.set(role == 'PLACE' ? 'places' : 'users', response.data);
    } catch (e: any) {
      console.log(e);
    }
  }
}

const rooms = new RoomsApi();
export default rooms;

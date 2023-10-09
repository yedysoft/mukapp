import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class UserApi {
  async getInfo(): PVoid {
    try {
      const response = await axiosIns.get('/user-info/getInfo');
      stores.user.set('info', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getChats(): PVoid {
    try {
      const response = await axiosIns.get('/message/getChats');
      stores.user.set('chats', response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

const user = new UserApi();
export default user;

import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class UserApi {
  async getInfo(): PVoid {
    try {
      const response = await axiosIns.get('/user/getInfo');
      stores.user.set('info', response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

const user = new UserApi();
export default user;

import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class UserApi {
  async setUserInfo(): PVoid {
    try {
      const response = await axiosIns.get('/user/getUserInfo');
      stores.user.set('userInfo', response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

const user = new UserApi();
export default user;

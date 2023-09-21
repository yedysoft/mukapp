import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class UserApi {
  setUserInfo = async (): PVoid => {
    try {
      const response = await axiosIns.get('/user/getUserInfo');
      console.log(response.data);
      stores.auth.set('user', response.data);
    } catch (e) {
      console.log(e);
    }
  };
}

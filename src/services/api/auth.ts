import {ILogin} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import socket from './socket';
import user from './user';

export class AuthApi {
  login = async (form: ILogin): PVoid => {
    try {
      this.clearAuth();
      const response = await axiosIns.post('/auth/login', form);
      stores.auth.set('authToken', response.data);
      await this.checkToken();
    } catch (e) {
      console.log(e);
    }
  };

  logout = async (): PVoid => {
    this.clearAuth();
    await this.checkToken();
    await socket.disconnect();
  };

  checkToken = async (): PVoid => {
    let stat = false;
    try {
      const opt = await axiosIns.options('/auth/checkToken');
      if (opt.status && opt.status === 200) {
        await user.setUserInfo();
        await socket.connect();
        stat = true;
      }
    } catch (e: any) {
      //e.response.status && console.log(e.response.status);
      console.log(e);
    } finally {
      stores.auth.set('loggedIn', stat);
    }
  };

  private clearAuth = () => {
    stores.auth.setMany({
      authToken: null,
      loggedIn: false,
      user: {id: '-1', coin: 0},
    });
  };
}

const auth = new AuthApi();
export default auth;
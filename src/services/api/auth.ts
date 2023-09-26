import {ILogin} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import socket from './socket';
import user from './user';

export class AuthApi {
  async login(form: ILogin): PVoid {
    try {
      this.clearAuth();
      const response = await axiosIns.post('/auth/login', form);
      stores.auth.set('authToken', response.data);
      await this.checkToken();
    } catch (e) {
      console.log(e);
    }
  }

  async logout(): PVoid {
    await socket.disconnect();
    this.clearAuth();
    await this.checkToken();
  }

  async checkToken(): PVoid {
    try {
      const opt = await axiosIns.options('/auth/checkToken');
      if (opt.status && opt.status === 200) {
        await user.setUserInfo();
        await socket.connect();
        stores.auth.set('loggedIn', true);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  private clearAuth() {
    stores.auth.set('authToken', '');
  }
}

const auth = new AuthApi();
export default auth;

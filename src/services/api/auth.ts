import {IForgot, ILogin, IRegister} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import socket from './socket';
import user from './user';
import subscription from './subscription';
import {PVoid} from '../../types';

export class AuthApi {
  async forgotPass(form: IForgot): PVoid {
    try {
      stores.loading.set('forgotPass', true);
      await axiosIns.post('/auth/forgotPass', form);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('forgotPass', false);
    }
  }

  async register(form: IRegister): PVoid {
    try {
      stores.loading.set('register', true);
      await axiosIns.post('/auth/register', form);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('register', false);
    }
  }

  async login(form: ILogin): PVoid {
    try {
      stores.loading.set('login', true);
      this.clearAuth();
      const response = await axiosIns.post('/auth/login', form);
      stores.auth.set('authToken', response.data);
      await this.checkToken();
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('login', false);
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
        await user.getInfo();
        await socket.connect();
        await subscription.globalSubscribes();
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

import {IForgot, ILogin, IRegister} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import socket from './socket';
import user from './user';
import {MessageBody, PVoid} from '../../types';
import room from './room';
import subscription from './subscription';

class AuthApi {
  async forgotPass(form: IForgot): PVoid {
    try {
      stores.loading.set('forgotPass', true);
      const response = await axiosIns.post<MessageBody>('/auth/forgotPass', form);
      stores.ui.addMessage(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('forgotPass', false);
    }
  }

  async register(form: IRegister): PVoid {
    try {
      stores.loading.set('register', true);
      const response = await axiosIns.post<MessageBody>('/auth/register', form);
      stores.ui.addMessage(response.data);
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
      const response = await axiosIns.post<string>('/auth/login', form);
      stores.auth.set('authToken', response.data);
      await this.checkToken();
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('login', false);
    }
  }

  async logout(): PVoid {
    try {
      stores.loading.set('logout', true);
      await room.closeRoom();
      await socket.disconnect();
      this.clearAuth();
      await this.checkToken();
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('logout', false);
    }
  }

  async checkToken(): PVoid {
    try {
      const opt = await axiosIns.options('/auth/checkToken');
      if (opt.status && opt.status === 200) {
        await user.getInfo();
        await socket.connect();
        await user.getAllNotifications(stores.user.getInfo.id);
        await subscription.globalSubscribes();
        stores.auth.set('loggedIn', true);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  private clearAuth() {
    stores.auth.set('authToken', '');
    stores.room.set('config', {id: '', name: '', roomId: ''});
    stores.user.setMany({notifications: [], chats: []});
  }
}

const auth = new AuthApi();
export default auth;

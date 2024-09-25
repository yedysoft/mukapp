import {IForgot, ILogin, ILoginHistory, IRegister} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import socket from './socket';
import user from './user';
import {IAuthApi, IAuthsApi, MessageBody, PVoid} from '../../types';
import room from './room';
import subscription from './subscription';
import chat from './chat';
import helper from './helper';
import {IDeviceType} from '../../types/enums';
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import {DeviceType} from 'expo-device';

export class AuthApi implements IAuthApi {
  private authsApi: IAuthsApi;

  constructor(authsApi: IAuthsApi) {
    this.authsApi = authsApi;
  }

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
      if (response.status === 200) {
        stores.auth.set('authToken', response.data);
        await this.checkToken();
      }
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
      if (opt.status === 200) {
        await user.getInfo();
        await this.saveLoginHistory();
        await user.getAllNotifications();
        await chat.getChats();
        await this.authsApi.getAuths();
        await socket.connect();
        await subscription.globalSubscribes();
        const isNeededPassChange = await this.isNeededPassChange();
        stores.auth.setMany({isNeededPassChange: isNeededPassChange, loggedIn: !isNeededPassChange});
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async isNeededPassChange(): Promise<boolean> {
    try {
      const response = await axiosIns.get<boolean>('/user/isNeededPassChange');
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async saveLoginHistory(): PVoid {
    try {
      const ipAddress = await helper.getPublicIp();
      const deviceType: IDeviceType = Device.deviceType ? (DeviceType[Device.deviceType] as IDeviceType) : 'UNKNOWN';
      const deviceBrand = Device.brand;
      const deviceModel = Device.modelName;
      const operatingSystem = `${Platform.OS} ${Device.osVersion}`;

      const data: ILoginHistory = {ipAddress, deviceType, deviceBrand, deviceModel, operatingSystem};
      const response = await axiosIns.post('/login-history/saveHistory', data);
      if (response.status === 200) {
        console.log('Giriş bilgileri kaydedildi:', data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private clearAuth() {
    stores.auth.setMany({loggedIn: false, authToken: ''});
    stores.room.set('config', {id: '', name: '', roomId: ''});
    stores.user.setMany({notifications: [], chats: []});
  }
}

export default AuthApi;

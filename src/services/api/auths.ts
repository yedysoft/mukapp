import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {IAuthsApi, PVoid} from '../../types';
import {IAuthsType} from '../../types/enums';
import * as WebBrowser from 'expo-web-browser';
import media from './media';
import AuthApi from './auth';
import {IAuths} from '../../types/auth';

export class AuthsApi implements IAuthsApi {
  clearAuth = async (type: IAuthsType): PVoid => {
    try {
      stores.loading.set('clearAuth', true);
      const response = await axiosIns.delete(`/auths/clearAuth/${type}`);
      if (response.status === 200) {
        await this.getAuths();
        stores.ui.addInfo('Hesap bağlantısı kaldırıldı.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('clearAuth', false);
    }
  };

  getAuths = async (): PVoid => {
    try {
      const response = await axiosIns.get<IAuths[]>('/auths/getAuths');
      if (response.status === 200) {
        stores.auth.set('auths', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  connectAccount = async (key: IAuthsType, name: string, isLogin = false): PVoid => {
    try {
      stores.loading.set('connectAccount', true);
      let authUrl;
      if (key === 'YEDY') {
        authUrl = await media.getAuthUrl();
      }
      if (authUrl) {
        const result = await WebBrowser.openAuthSessionAsync(authUrl, isLogin ? 'muk://login' : 'muk://auth', {
          toolbarColor: stores.ui.getTheme.colors.primary,
          controlsColor: stores.ui.getTheme.colors.primary,
          enableBarCollapsing: false,
          enableDefaultShareMenuItem: false,
          readerMode: false,
        });
        if (result.type === 'success') {
          if (isLogin) {
            const params = new URLSearchParams(result.url.split('?')[1]);
            const code = params.get('code');
            if (code) {
              stores.auth.set('authToken', code);
              await auth.saveLoginHistory();
              await auth.checkToken();
            }
          } else {
            await this.connected(key, name);
          }
        } else {
          await this.connected(key, name);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('connectAccount', false);
    }
  };

  private connected = async (key: IAuthsType, name: string) => {
    await this.getAuths();
    if (stores.auth.auths.some(value => value.type === key)) {
      stores.ui.addInfo(`${name} hesabınız bağlandı.`);
    }
  };
}

const auths: IAuthsApi = new AuthsApi();
export const auth = new AuthApi(auths);
export default auths;

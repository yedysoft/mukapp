import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {IAuthsType} from '../../types/enums';
import * as WebBrowser from 'expo-web-browser';
import media from './media';

class AuthsApi {
  async clearAuth(type: IAuthsType): PVoid {
    try {
      stores.loading.set('clearAuth', true);
      const response = await axiosIns.delete(`/auths/clearAuth/${type}`);
      if (response.status === 200) {
        stores.ui.addInfo('Hesap bağlantısı kaldırıldı.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('clearAuth', false);
    }
  }

  async getAuths(): PVoid {
    try {
      const response = await axiosIns.get<IAuthsType[]>('/auths/getAuths');
      if (response.status === 200) {
        stores.auth.set('auths', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async connectAccount(key: IAuthsType, name: string): PVoid {
    try {
      stores.loading.set('connectAccount', true);
      let authUrl;
      if (key === 'SPOTIFY') {
        authUrl = await media.getAuthUrl();
      }
      if (authUrl) {
        const params = new URLSearchParams(authUrl.split('?')[1]);
        const redirectUri = params.get('redirect_uri');
        await WebBrowser.openAuthSessionAsync(authUrl, redirectUri, {
          toolbarColor: stores.ui.getTheme.colors.primary,
          controlsColor: stores.ui.getTheme.colors.primary,
          secondaryToolbarColor: 'red',
          enableBarCollapsing: false,
          enableDefaultShareMenuItem: false,
          readerMode: false,
        });
        await this.getAuths();
        if (stores.auth.auths.some(value => value === key)) {
          stores.ui.addInfo(`${name} hesabınız bağlandı.`);
        }
      }
      if (key === 'SPOTIFY') {
        stores.media.set('authenticated', true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('connectAccount', false);
    }
  }
}

const auths = new AuthsApi();
export default auths;

import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {IAuthsType} from '../../types/enums';
import * as WebBrowser from 'expo-web-browser';
import media from './media';
import {Linking} from 'react-native';

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
        await WebBrowser.openBrowserAsync(authUrl, {
          toolbarColor: stores.ui.getTheme.colors.primary,
          controlsColor: stores.ui.getTheme.colors.primary,
          enableBarCollapsing: false,
          enableDefaultShareMenuItem: false,
          readerMode: false,
        });
        console.log(sub);
        sub.remove();
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('connectAccount', false);
    }
  }

  let  redirectSubscription = "";
  private async waitForRedirect(redirectUri: string | null | undefined) {
    return new Promise(resolve => {
      const redirectHandler = ({url}) => {
        if (redirectUri && url.startsWith(redirectUri)) {
          const params = new URLSearchParams(url.split('?')[1]);
          const code = params.get('code');
          const state = params.get('state');
          if (code && state && state === 'login') {
            resolve({type: 'error', token: code});
          } else {
            resolve({type: 'error', token: null});
          }
        }
      };

      redirectSubscription = Linking.addEventListener('url', redirectHandler);
    });
  }
}

const auths = new AuthsApi();
export default auths;

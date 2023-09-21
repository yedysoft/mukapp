import {ILogin} from '../../types/auth';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {services} from '../index';

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
  };

  checkToken = async (): PVoid => {
    let stat = false;
    try {
      const opt = await axiosIns.options('/auth/checkToken');
      if (opt.status && opt.status === 200) {
        await services.api.user.setUserInfo();
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
    });
  };
}

import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {IInfo} from '../../types/user';
import {IGroup} from '../../types/chat';
import {IServer} from '../../types/main';

class MainApi {
  async getInfoByIds(ids: string[]): PVoid {
    try {
      const response = await axiosIns.post<IInfo[]>('/user-info/getInfoByIds', ids);
      stores.main.do(() => {
        for (const i of response.data) {
          stores.main.addOrUpdateInfo(i);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getServerByIds(ids: string[]): PVoid {
    try {
      const response = await axiosIns.post<IServer[]>('/server/getServerByIds', ids);
      stores.main.do(() => {
        for (const i of response.data) {
          stores.main.addOrUpdateServer(i);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getGroupByIds(ids: string[]): PVoid {
    try {
      const response = await axiosIns.post<IGroup[]>('/message-group/getGroupByIds', ids);
      stores.main.do(() => {
        for (const i of response.data) {
          stores.main.addOrUpdateGroup(i);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const main = new MainApi();
export default main;

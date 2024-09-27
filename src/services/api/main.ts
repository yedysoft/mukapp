import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {IInfo} from '../../types/user';
import {IGroup} from '../../types/chat';

class MainApi {
  getInfoByIds = async (ids: string[]): PVoid => {
    try {
      if (ids && ids.length > 0) {
        const response = await axiosIns.post<IInfo[]>('/user-info/getInfoByIds', ids);
        stores.main.addOrUpdateInfos(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getGroupByIds = async (ids: string[]): PVoid => {
    try {
      if (ids && ids.length > 0) {
        const response = await axiosIns.post<IGroup[]>('/message-group/getGroupByIds', ids);
        stores.main.addOrUpdateGroups(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

const main = new MainApi();
export default main;

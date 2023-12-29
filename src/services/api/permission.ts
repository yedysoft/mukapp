import * as Notifications from 'expo-notifications';
import {PVoid} from '../../types';

class PermissionApi {
  async getNotification(): PVoid {
    try {
      const {granted} = await Notifications.getPermissionsAsync();
      if (!granted) {
        await Notifications.requestPermissionsAsync();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const permission = new PermissionApi();
export default permission;

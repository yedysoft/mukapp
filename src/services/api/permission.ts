import * as Notifications from 'expo-notifications';
import {PVoid} from '../../types';
import {NotificationPermissionsStatus} from 'expo-notifications/src/NotificationPermissions.types';

class PermissionApi {
  getNotification = async (): PVoid => {
    try {
      const {status}: NotificationPermissionsStatus = await Notifications.getPermissionsAsync();
      if (status !== 'denied' && status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    } catch (e) {
      console.log(e);
    }
  };
}

const permission = new PermissionApi();
export default permission;

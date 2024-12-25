import {stores} from '../stores';
import * as Notifications from 'expo-notifications';
import defaults from '../utils/defaults';
import Constants from 'expo-constants';

const subscriptions: Notifications.EventSubscription[] = [];

const getExpoPushToken = async (): Promise<string | null> => {
  let token: string | null;
  try {
    const {data} = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    token = data;
  } catch {
    token = null;
  }
  return token;
};

const load = async () => {
  const token = await getExpoPushToken();
  stores.ui.set('expoToken', token);

  Notifications.setNotificationHandler({
    handleNotification: async notification => {
      console.log('handleNotification', notification);
      return {
        shouldPlaySound: false,
        shouldShowAlert: true,
        shouldSetBadge: false,
      };
    },
    handleSuccess: notificationId => {
      console.log('handleSuccess', notificationId);
    },
    handleError: (notificationId, error) => {
      console.log('handleError', notificationId, error);
    },
  });

  subscriptions.push(
    Notifications.addNotificationReceivedListener(notification => {
      console.log('NotificationReceivedListener', notification);
    }),
  );
  subscriptions.push(
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('NotificationResponseReceivedListener', response);
      response.notification.request.identifier &&
        Notifications.dismissNotificationAsync(response.notification.request.identifier);
    }),
  );

  for (const category of defaults.getNotificationCategories) {
    await Notifications.setNotificationCategoryAsync(category.identifier, category.actions, category.options);
  }
};

const unload = () => {
  subscriptions.forEach(value => Notifications.removeNotificationSubscription(value));
};

export default {load: load, unload: unload};

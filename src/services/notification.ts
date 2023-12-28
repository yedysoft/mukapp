import {stores} from '../stores';
import * as Notifications from 'expo-notifications';

const subscriptions: Notifications.Subscription[] = [];

const getExpoPushToken = async (): Promise<string | null> => {
  let token: string | null;
  try {
    const {data} = await Notifications.getExpoPushTokenAsync();
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
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  subscriptions.push(
    Notifications.addNotificationReceivedListener(notification => {
      console.log('NotificationReceivedListener', notification);
    }),
  );
  subscriptions.push(
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('userText:', response.userText);
    }),
  );

  await Notifications.setNotificationCategoryAsync('message', [
    {
      identifier: 'send',
      buttonTitle: 'Gönder',
      textInput: {
        submitButtonTitle: 'Test',
        placeholder: 'undefined',
      },
      options: {opensAppToForeground: false},
    },
    {
      identifier: 'sil',
      buttonTitle: 'Sil',
    },
  ]);
};

const unload = () => {
  subscriptions.forEach(value => Notifications.removeNotificationSubscription(value));
};

export default {load: load, unload: unload};

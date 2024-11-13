import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import AppNavigation from './src/navigation/AppNavigation';
import {AppProvider} from './src/utils/Providers';
import {hydrateStores, stores, useStores} from './src/stores';
import {initServices, services} from './src/services';
import MukSplashScreen from './src/screens/auth/MukSplashScreen';
import notification from './src/services/notification';
import listeners from './src/services/listeners';
import * as SystemUI from 'expo-system-ui';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import 'text-encoding';
import 'expo-dev-client';
import {ColorValue, Linking} from 'react-native';
import {authRedirectUrl} from './config';
import CustomStatusBar from './src/navigation/CustomStatusBar';

const initializeApp = async () => {
  await Font.loadAsync({
    'ProductSans-Bold': require('./assets/fonts/Product-Sans-Bold.ttf'),
    'ProductSans-Regular': require('./assets/fonts/Product-Sans-Regular.ttf'),
    'ProductSans-Italic': require('./assets/fonts/Product-Sans-Italic.ttf'),
  });
  await hydrateStores();
  listeners.load();
  await initServices();
  await notification.load();
  await services.api.permission.getNotification();
  const url = await Linking.getInitialURL();
  if (url) {
    if (url.startsWith(authRedirectUrl)) {
      const params = new URLSearchParams(url.split('?')[1]);
      const code = params.get('code');
      if (code) {
        stores.auth.set('authToken', code);
      }
    }
  }
  await services.api.auth.checkToken();
};

const deinitializeApp = async () => {
  listeners.unload();
  notification.unload();
  await services.api.room.closeRoom();
  await services.api.socket.disconnect();
};

export default observer(() => {
  const {ui} = useStores();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeApp().then(() => setReady(true));
    return () => {
      deinitializeApp().then(() => setReady(false));
    };
  }, []);

  const background: ColorValue = ui.getTheme.colors.background;
  SystemUI.getBackgroundColorAsync().then(async value => {
    if (value !== background) {
      await SystemUI.setBackgroundColorAsync(background);
    }
  });

  return (
    <AppProvider>
      <CustomStatusBar />
      {!ready ? <MukSplashScreen /> : <AppNavigation />}
    </AppProvider>
  );
});

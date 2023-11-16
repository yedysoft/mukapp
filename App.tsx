import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import 'text-encoding';
import './src/services/xhrInterceptors';
import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {AppProvider} from './src/utils/Providers';
import {hydrateStores, stores} from './src/stores';
import {initServices, services} from './src/services';
import SplashScreen from './src/screens/auth/SplashScreen';
import MessageStack from './src/components/stacks/MessageStack';
import DialogStack from './src/components/stacks/DialogStack';
import {usePushNotifications} from './src/services/pushNotifications';
import * as Device from 'expo-device';
import {Appearance, useColorScheme} from 'react-native';

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);

  Device.isDevice && usePushNotifications();

  const initializeApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    await services.api.auth.checkToken();
  }, []);

  const deinitializeApp = useCallback(async () => {
    await services.api.room.closeRoom();
    await services.api.socket.disconnect();
  }, []);

  useEffect(() => {
    console.log('colorScheme', colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    console.log('getColorScheme', Appearance.getColorScheme());
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      console.log('Appearance.addChangeListener', colorScheme);
    });
    initializeApp().then(() => setReady(true));
    return () => {
      subscription.remove();
      deinitializeApp().then(() => console.log('deinitializeApp'));
    };
  }, []);

  return (
    <AppProvider>
      <PaperProvider theme={stores.ui.getTheme}>
        <StatusBar style={stores.ui.getStatusBarStyle} />
        <MessageStack />
        <DialogStack />
        {!ready ? <SplashScreen /> : <AppNavigation />}
      </PaperProvider>
    </AppProvider>
  );
});

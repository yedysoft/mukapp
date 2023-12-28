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
import MukSplashScreen from './src/screens/auth/MukSplashScreen';
import MessageStack from './src/components/stacks/MessageStack';
import DialogStack from './src/components/stacks/DialogStack';
import {NavigationContainer, Theme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import appearance from './src/services/appearance';
import notification from './src/services/notification';

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const [ready, setReady] = useState(false);

  const initializeApp = useCallback(async () => {
    await hydrateStores();
    appearance.load();
    await notification.load();
    await initServices();
    await services.api.permission.getNotification();
    await services.api.auth.checkToken();
  }, []);

  const deinitializeApp = useCallback(async () => {
    appearance.unload();
    notification.unload();
    await services.api.room.closeRoom();
    await services.api.socket.disconnect();
  }, []);

  useEffect(() => {
    initializeApp().then(() => setReady(true));
    return () => {
      deinitializeApp().then(() => setReady(false));
    };
  }, [stores.ui.getReloadToggle]);

  return (
    <AppProvider>
      <NavigationContainer theme={stores.ui.getTheme as unknown as Theme}>
        <PaperProvider
          theme={stores.ui.getTheme}
          settings={{
            icon: props => <Feather {...props} />,
          }}
        >
          <StatusBar style={stores.ui.getStatusBarStyle} />
          <MessageStack />
          <DialogStack />
          {!ready ? <MukSplashScreen /> : <AppNavigation />}
        </PaperProvider>
      </NavigationContainer>
    </AppProvider>
  );
});

import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import 'text-encoding';
import 'expo-dev-client';
import './src/services/xhrInterceptors';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {AppProvider} from './src/utils/Providers';
import {hydrateStores, stopPersists, stores} from './src/stores';
import {initServices, services} from './src/services';
import MukSplashScreen from './src/screens/auth/MukSplashScreen';
import MessageStack from './src/components/stacks/MessageStack';
import DialogStack from './src/components/stacks/DialogStack';
import {NavigationContainer, Theme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import appearance from './src/services/appearance';
import notification from './src/services/notification';

const initializeApp = async () => {
  await hydrateStores();
  appearance.load();
  await initServices();
  await notification.load();
  await services.api.permission.getNotification();
  await services.api.auth.checkToken();
};

const deinitializeApp = async () => {
  stopPersists();
  appearance.unload();
  notification.unload();
  await services.api.room.closeRoom();
  await services.api.socket.disconnect();
};

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const [ready, setReady] = useState(false);

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
          <StatusBar backgroundColor={stores.ui.getTheme.colors.background} style={stores.ui.getStatusBarStyle} />
          <MessageStack />
          <DialogStack />
          {!ready ? <MukSplashScreen /> : <AppNavigation />}
        </PaperProvider>
      </NavigationContainer>
    </AppProvider>
  );
});

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
import ErrorStack from './src/components/stacks/ErrorStack';
import DialogStack from './src/components/stacks/DialogStack';

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const [ready, setReady] = useState(false);

  const initializeApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    //await services.api.auth.checkToken();
  }, []);

  const deinitializeApp = useCallback(async () => {
    await services.api.room.closeRoom();
    await services.api.socket.disconnect();
  }, []);

  useEffect(() => {
    initializeApp().then(() => setReady(true));
    return () => {
      deinitializeApp().then(() => console.log('deinitializeApp'));
    };
  }, []);

  return (
    <AppProvider>
      <PaperProvider theme={stores.ui.getTheme}>
        <StatusBar style={stores.ui.getStatusBarStyle} />
        <ErrorStack />
        <DialogStack />
        {!ready ? <SplashScreen /> : <AppNavigation />}
      </PaperProvider>
    </AppProvider>
  );
});

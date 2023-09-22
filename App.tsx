import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import 'text-encoding';
import './src/services/xhrInterceptors';
import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {CombinedTheme} from './src/theme';
import {AppNavigation} from './src/navigation/AppNavigation';
import {AppProvider} from './src/utils/Providers';
import {hydrateStores} from './src/stores';
import {initServices, services} from './src/services';
import SplashScreen from './src/screens/auth/SplashScreen';

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const [ready, setReady] = useState(false);

  const initializeApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    await services.api.auth.checkToken();
  }, []);

  useEffect(() => {
    initializeApp().then(() => setReady(true));
  }, []);

  return (
    <AppProvider>
      <PaperProvider theme={CombinedTheme}>
        <StatusBar style="auto" />
        {!ready ? <SplashScreen /> : <AppNavigation />}
      </PaperProvider>
    </AppProvider>
  );
});

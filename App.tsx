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
import MukSplashScreen from './src/screens/auth/SplashScreen';
import MessageStack from './src/components/stacks/MessageStack';
import DialogStack from './src/components/stacks/DialogStack';
import {usePushNotifications} from './src/services/pushNotifications';
import * as Device from 'expo-device';
import {Appearance, NativeEventSubscription} from 'react-native';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import themes from './src/themes';

SplashScreen.preventAutoHideAsync();

// noinspection JSUnusedGlobalSymbols
export default observer(() => {
  const [ready, setReady] = useState(false);
  const [apperanceListener, setApperanceListener] = useState<NativeEventSubscription>();

  const [fontsLoaded] = useFonts(themes.fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  Device.isDevice && usePushNotifications();

  const initializeApp = useCallback(async () => {
    await hydrateStores();
    const scheme = Appearance.getColorScheme();
    if (scheme) {
      stores.ui.set('systemScheme', scheme);
    }
    setApperanceListener(
      Appearance.addChangeListener(({colorScheme}) => {
        if (colorScheme) {
          stores.ui.set('systemScheme', colorScheme);
        }
      }),
    );
    await initServices();
    await services.api.auth.checkToken();
  }, []);

  const deinitializeApp = useCallback(async () => {
    apperanceListener?.remove();
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
      <NavigationContainer theme={stores.ui.getTheme as unknown as Theme}>
        <PaperProvider theme={stores.ui.getTheme}>
          <StatusBar style={stores.ui.getStatusBarStyle} />
          <MessageStack />
          <DialogStack />
          {!ready ? <MukSplashScreen /> : <AppNavigation onLayout={onLayoutRootView} />}
        </PaperProvider>
      </NavigationContainer>
    </AppProvider>
  );
});

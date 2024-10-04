import {StatusBar, StatusBarStyle} from 'expo-status-bar';
import {PaperProvider, useTheme} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import AppNavigation from './src/navigation/AppNavigation';
import {AppProvider} from './src/utils/Providers';
import {hydrateStores, stopPersists, stores, useStores} from './src/stores';
import {initServices, services, useServices} from './src/services';
import MukSplashScreen from './src/screens/auth/MukSplashScreen';
import MessageStack from './src/components/stacks/MessageStack';
import DialogStack from './src/components/stacks/DialogStack';
import {NavigationContainer, Theme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import notification from './src/services/notification';
import listeners from './src/services/listeners';
import * as SystemUI from 'expo-system-ui';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import 'react-native-gesture-handler';
import 'text-encoding';
import {navigationRef} from './src/navigation/RootNavigation';
import 'expo-dev-client';
import {ColorValue, Linking} from 'react-native';
import {authRedirectUrl} from './config';
import {MukTheme} from './src/types';

const initializeApp = async () => {
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
  stopPersists();
  listeners.unload();
  notification.unload();
  await services.api.room.closeRoom();
  await services.api.socket.disconnect();
};

export default observer(() => {
  const {ui} = useStores();
  const [ready, setReady] = useState(false);
  console.log('RenderApp', ui.getLanguage);

  useEffect(() => {
    initializeApp().then(() => setReady(true));
    return () => {
      deinitializeApp().then(() => setReady(false));
    };
  }, [ui.getReloadToggle]);

  const background: ColorValue = ui.getTheme.colors.background;
  SystemUI.getBackgroundColorAsync().then(async value => {
    if (value !== background) {
      await SystemUI.setBackgroundColorAsync(background);
    }
  });

  return (
    <AppProvider>
      <NavigationContainer ref={navigationRef} theme={ui.getTheme as unknown as Theme}>
        <PaperProvider
          theme={ui.getTheme}
          settings={{
            icon: props => <>{['reply'].includes(props.name) ? <FontAwesome6 {...props} /> : <Feather {...props} />}</>,
          }}
        >
          <CustomStatusBar />
          {!ready ? <MukSplashScreen /> : <AppNavigation />}
          <MessageStack />
          <DialogStack />
        </PaperProvider>
      </NavigationContainer>
    </AppProvider>
  );
});

const CustomStatusBar = observer(() => {
  const {ui, media, room} = useStores();
  const {api} = useServices();
  const {colors} = useTheme<MukTheme>();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const style: StatusBarStyle = api.helper.isColorLight(dominantColor) ? 'dark' : 'light';

  return (
    <StatusBar
      backgroundColor={room.isLive ? dominantColor : colors.background}
      style={room.isLive ? style : ui.getStatusBarStyle}
    />
  );
});

import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {StatusBar, StatusBarStyle} from 'expo-status-bar';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';
import {useServices} from '../services';
import {useTheme} from '../hooks';
import * as NavigationBar from 'expo-navigation-bar';
import {NavigationBarButtonStyle} from 'expo-navigation-bar';

export default observer(() => {
  const {api} = useServices();
  const {colors} = useTheme();
  const {ui, room, media} = useStores();
  const insets = useSafeAreaInsets();
  const dominantColor = media.getDominantColor ?? colors.background;

  const statusBarColor = room.isLive && room.isRoomPageOn ? dominantColor : colors.background;
  const statusBarstyle: StatusBarStyle = api.helper.isColorLight(statusBarColor) ? 'dark' : 'light';

  const navigationBarColor = ui.pickerViewVisible
    ? colors.dialog
    : room.isLive && !room.isRoomPageOn
    ? dominantColor
    : colors.background;
  const navigationBarStyle: NavigationBarButtonStyle = api.helper.isColorLight(navigationBarColor) ? 'dark' : 'light';

  if (Platform.OS === 'android') {
    NavigationBar.getBackgroundColorAsync().then(async value => {
      if (value !== navigationBarColor) {
        await NavigationBar.setBackgroundColorAsync(navigationBarColor);
        await NavigationBar.setButtonStyleAsync(navigationBarStyle);
      }
    });
  }

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} style={room.isLive ? statusBarstyle : ui.getStatusBarStyle} />
      {Platform.OS === 'ios' && <View style={{height: insets.top, backgroundColor: statusBarColor}} />}
    </>
  );
});

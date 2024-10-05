import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {useServices} from '../services';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../types';
import {StatusBar, StatusBarStyle} from 'expo-status-bar';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';

export const CustomStatusBar = observer(() => {
  const {ui, media, room} = useStores();
  const {api} = useServices();
  const {colors} = useTheme<MukTheme>();
  const insets = useSafeAreaInsets();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const style: StatusBarStyle = api.helper.isColorLight(dominantColor) ? 'dark' : 'light';
  const statusBarColor = room.isLive ? dominantColor : colors.background;

  return (
    <>
      <StatusBar
        backgroundColor={room.isLive ? dominantColor : colors.background}
        style={room.isLive ? style : ui.getStatusBarStyle}
      />
      {Platform.OS === 'ios' && (
        <View
          style={{
            height: insets.top,
            backgroundColor: statusBarColor,
          }}
        />
      )}
    </>
  );
});

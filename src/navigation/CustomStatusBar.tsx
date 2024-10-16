import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {StatusBar, StatusBarStyle} from 'expo-status-bar';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';
import {useServices} from '../services';
import {useTheme} from '../hooks';

export default observer(() => {
  const {ui, room, media} = useStores();
  const {api} = useServices();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const dominantColor = media.getDominantColor ?? colors.background;
  const statusBarColor = room.isLive && room.isRoomPageOn ? dominantColor : colors.background;
  const isColorLight = api.helper.isColorLight(statusBarColor);
  const style: StatusBarStyle = isColorLight ? 'dark' : 'light';

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} style={room.isLive ? style : ui.getStatusBarStyle} />
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

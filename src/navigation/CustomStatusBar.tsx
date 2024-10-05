import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../types';
import {StatusBar, StatusBarStyle} from 'expo-status-bar';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';
import useDominantColor from '../hooks/useDominantColor';

export const CustomStatusBar = observer(() => {
  const {ui} = useStores();
  const {colors} = useTheme<MukTheme>();
  const insets = useSafeAreaInsets();
  const {isLive, dominantColor, isColorLight} = useDominantColor();
  const style: StatusBarStyle = isColorLight ? 'dark' : 'light';
  const statusBarColor = isLive ? dominantColor : colors.background;

  return (
    <>
      <StatusBar
        backgroundColor={isLive ? dominantColor : colors.background}
        style={isLive ? style : ui.getStatusBarStyle}
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

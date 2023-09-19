import {useDrawerProgress} from '@react-navigation/drawer';
import React from 'react';
import {Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import {responsiveWidth, screenWidth} from '../../utils/Responsive';

export default function MukDrawerHeader() {
  const theme = useTheme();
  const drawerProgress: any = useDrawerProgress();

  const styleTop = useAnimatedStyle(() => {
    const translateY = interpolate(drawerProgress.value, [0, 1], [-100, 0]);
    const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: screenWidth,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.primary,
          padding: responsiveWidth(24),
        },
        styleTop,
      ]}
    >
      <Text
        style={{
          fontSize: 24,
          color: 'white',
        }}
      >
        Test
      </Text>
    </Animated.View>
  );
}

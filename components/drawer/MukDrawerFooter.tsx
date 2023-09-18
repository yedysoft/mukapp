import {useDrawerProgress} from '@react-navigation/drawer';
import React from 'react';
import {Text, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import {responsiveWidth, screenWidth} from '../../utils/Responsive';

export default function MukDrawerFooter() {
  const theme = useTheme();
  const drawerProgress: any = useDrawerProgress();

  const styleBot = useAnimatedStyle(() => {
    const translateY = interpolate(drawerProgress.value, [0, 1], [100, 0]);
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
          padding: responsiveWidth(8),
        },
        styleBot,
      ]}
    >
      <View
        style={{
          marginVertical: 8,
          marginRight: 16,
          marginLeft: 8,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#f0f0f0',
        }}
      />
      <View
        style={{
          marginVertical: 4,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: 'white',
          }}
        >
          Deneme
        </Text>
        <Text
          style={{
            color: 'white',
          }}
        >
          1234
        </Text>
      </View>
    </Animated.View>
  );
}

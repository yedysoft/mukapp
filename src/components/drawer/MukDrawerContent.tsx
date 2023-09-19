import {useDrawerProgress} from '@react-navigation/drawer';
import React from 'react';
import {Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';

export default function MukDrawerContent() {
  const theme = useTheme();
  const drawerProgress: any = useDrawerProgress();

  const styleMid = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{translateX}],
    };
  });

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          marginVertical: 8,
        },
        styleMid,
      ]}
    >
      <Text style={{color: 'white', fontSize: 16, marginLeft: 20}}>Menu</Text>
    </Animated.ScrollView>
  );
}

import {useTheme} from 'react-native-paper';
import BottomTab from '../BottomTab';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';

export default function MainWrapper() {
  const {colors} = useTheme();

  const progress = useDrawerProgress().value;
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(progress, [0, 1], [0, 16]);
    return {transform: [{scale}], borderRadius};
  });

  return (
    <Animated.View style={[animatedStyle, {flex: 1}]}>
      <BottomTab />
    </Animated.View>
  );
}

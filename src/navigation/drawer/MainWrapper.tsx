import {useTheme} from 'react-native-paper';
import BottomTab from '../BottomTab';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';
import {observer} from 'mobx-react';
import {stores} from '../../stores';

const Wrapper = observer(() => {
  const {colors} = useTheme();
  const progress = useDrawerProgress().value;
  stores.ui.set('progress', progress);
  const progressive = stores.ui.progress;
  console.log(progressive);
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progressive, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(progressive, [0, 1], [0, 16]);
    return {transform: [{scale}], borderRadius};
  });

  return (
    <Animated.View style={[animatedStyle, {flex: 1}]}>
      <BottomTab />
    </Animated.View>
  );
});

export default function MainWrapper() {
  return <Wrapper />;
}

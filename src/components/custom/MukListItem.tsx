import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactNode, useEffect} from 'react';
import {MukTheme} from '../../types';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function MukListItem({onPress, children, style, disabled}: Props) {
  const {colors} = useTheme<MukTheme>();

  const offset = useSharedValue(-200);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(0);
  },[])

  return (
    <Animated.View style={animationStyle}>
      <TouchableOpacity
        style={[
          {
            width: '100%',
            flexDirection: 'row',
            gap: responsiveWidth(16),
            paddingHorizontal: responsiveWidth(16),
            paddingVertical: responsiveWidth(8),
            overflow: 'hidden',
          },
          style,
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

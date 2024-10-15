import useTheme from '../../hooks/useTheme';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactNode, useEffect} from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function MukListItem({onPress, children, style, disabled}: Props) {
  const {colors} = useTheme();

  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1000});
  }, []);

  return (
    <Animated.View style={{opacity: opacity}}>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            gap: responsiveWidth(16),
            paddingHorizontal: responsiveWidth(16),
            paddingVertical: responsiveWidth(8),
            borderBottomWidth: 1,
            borderColor: colors.shadow,
          },
          style,
        ]}
        activeOpacity={disabled ? 1 : 0.5}
        disabled={disabled && !onPress}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

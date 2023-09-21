import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';

type Props = {
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function MukListItem({onPress, children, style}: Props) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          gap: responsiveWidth(16),
          paddingHorizontal: responsiveWidth(16),
          paddingVertical: responsiveWidth(8),
          overflow: 'hidden',
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

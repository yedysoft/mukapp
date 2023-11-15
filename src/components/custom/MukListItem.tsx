import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';
import {MukTheme} from '../../types';

type Props = {
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function MukListItem({onPress, children, style, disabled}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
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
  );
}

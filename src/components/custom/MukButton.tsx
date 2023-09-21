import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: PureFunc;
  label?: string;
  children?: ReactNode;
};

export default function MukButton({buttonStyle, onPress, label, children}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.primary,
          flex: 1,
          padding: responsiveWidth(16),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      {children}
      <Text style={{fontSize: responsiveSize(16), fontWeight: 'bold', color: theme.colors.onBackground}}>{label}</Text>
    </TouchableOpacity>
  );
}

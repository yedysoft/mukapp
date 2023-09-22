import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: PureFunc;
  label?: string;
  labelData?: string;
  children?: ReactNode;
};

export default function MukProfileButton({buttonStyle, onPress, label, labelData, children}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.primary,
          padding: responsiveWidth(20),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      {children}
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontSize: responsiveSize(18), fontWeight: 'bold', color: theme.colors.primary}}>{labelData}</Text>
        <Text style={{fontSize: responsiveSize(14), fontWeight: 'bold', color: theme.colors.onSurfaceVariant}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

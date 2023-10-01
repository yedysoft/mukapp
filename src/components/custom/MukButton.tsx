import {ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  onPress?: PureFunc;
  label?: string;
  children?: ReactNode;
  scale?: number;
};

export default function MukButton({buttonStyle, loading, onPress, label, children, scale}: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.primary,
          padding: responsiveWidth(20 * (scale ?? 1)),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      {children}
      {loading ? <ActivityIndicator color="white" style={{marginRight: 5}} /> : null}
      <Text style={{fontSize: responsiveSize(16), fontWeight: 'bold', color: theme.colors.background}}>{label}</Text>
    </TouchableOpacity>
  );
}

import {ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';
import {PureFunc} from '../../types';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onPress?: PureFunc;
  label?: string;
  children?: ReactNode;
  scale?: number;
  textStyle?: StyleProp<TextStyle>;
};

export default function MukButton({buttonStyle, disabled, loading, onPress, label, children, scale, textStyle}: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      disabled={loading ?? disabled}
      onPress={loading ? () => {} : onPress}
      style={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.primary,
          padding: responsiveWidth(20 * (scale ?? 1)),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.colors.background}
          style={{display: loading ? undefined : 'none', marginRight: 5}}
        />
      ) : null}
      {children}
      <Text style={[{fontSize: responsiveSize(16), fontWeight: 'bold', color: theme.colors.background}, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

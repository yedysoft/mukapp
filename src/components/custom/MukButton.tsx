import {ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {ReactNode} from 'react';
import {MukTheme, PureFunc} from '../../types';

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
  const {colors} = useTheme<MukTheme>();

  return (
    <TouchableOpacity
      disabled={loading ?? disabled}
      onPress={loading ? () => {} : onPress}
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.primary,
          padding: responsiveWidth(20 * (scale ?? 1)),
          minHeight: responsiveWidth(20 * (scale ?? 1)),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      <ActivityIndicator color={colors.background} style={{display: loading ? undefined : 'none', marginRight: 5}} />
      {children}
      <Text style={[{fontSize: responsiveSize(16), fontWeight: 'bold', color: colors.background}, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

import {ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {ReactNode} from 'react';
import {MukTheme, PureFunc} from '../../types';
import YedyText from './YedyText';

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
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      <ActivityIndicator
        size={responsiveSize(12)}
        color={colors.dark}
        style={{display: loading ? undefined : 'none', marginRight: responsiveWidth(8)}}
      />
      {children}
      <YedyText fontType={'bold'} fontSize={16} style={[{color: colors.dark}, textStyle]}>
        {label}
      </YedyText>
    </TouchableOpacity>
  );
}

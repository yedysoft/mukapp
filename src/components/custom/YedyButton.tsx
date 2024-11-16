import {ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {ReactNode} from 'react';
import {PureFunc} from '../../types';
import YedyText from './YedyText';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onPress?: PureFunc;
  label?: string;
  children?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  visible?: boolean;
};

export default ({buttonStyle, disabled, loading, onPress, label, children, textStyle, visible = true}: Props) => {
  const {colors} = useTheme();
  const flattenedTextStyle = StyleSheet.flatten(textStyle) || {};
  const textColor = flattenedTextStyle.color || colors.dark; // Eğer `textStyle?.color` varsa al, yoksa default olarak `colors.dark` al

  return (
    <TouchableOpacity
      disabled={loading ?? disabled}
      onPress={loading ? () => {} : onPress}
      style={[
        {
          display: visible ? undefined : 'none',
          flexDirection: 'row',
          backgroundColor: colors.primary,
          paddingVertical: responsiveHeight(16),
          paddingHorizontal: responsiveWidth(28),
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          gap: responsiveWidth(8),
        },
        buttonStyle,
      ]}
    >
      <ActivityIndicator size={responsiveSize(12)} color={textColor} style={{display: loading ? undefined : 'none'}} />
      {children}
      <YedyText numberOfLines={1} type={'bold'} size={13} color={colors.dark} style={textStyle}>
        {label}
      </YedyText>
    </TouchableOpacity>
  );
};

import {ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import useTheme from '../../hooks/useTheme';
import {responsiveSize, responsiveWidth} from '../../utils/util';
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
  scale?: number;
  textStyle?: StyleProp<TextStyle>;
  visible?: boolean;
};

export default function MukButton({
  buttonStyle,
  disabled,
  loading,
  onPress,
  label,
  children,
  scale,
  textStyle,
  visible = true,
}: Props) {
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
        color={textColor}
        style={{display: loading ? undefined : 'none', marginRight: responsiveWidth(8)}}
      />
      {children}
      <YedyText
        fontType={'bold'}
        fontSize={16}
        style={[{color: colors.dark, marginLeft: children ? responsiveWidth(8) : undefined}, textStyle]}
      >
        {label}
      </YedyText>
    </TouchableOpacity>
  );
}

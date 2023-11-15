import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/Responsive';
import {KeyboardAvoidingView, Platform, StyleProp, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function AuthLayout({children, style}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: responsiveWidth(20),
          backgroundColor: colors.background,
          paddingBottom: Platform.OS === 'ios' ? 0 : responsiveWidth(16),
        },
        style,
      ]}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

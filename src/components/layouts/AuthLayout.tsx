import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveWidth} from '../../utils/Responsive';
import {KeyboardAvoidingView, Platform, StyleProp, ViewStyle} from 'react-native';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function AuthLayout({children, style}: Props) {
  const {colors} = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: responsiveWidth(20),
        backgroundColor: colors.background,
      }, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

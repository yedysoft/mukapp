import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {responsiveWidth, screenWidth} from '../../utils/util';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
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
      keyboardVerticalOffset={0}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
              width: screenWidth,
              backgroundColor: colors.background,
              paddingHorizontal: responsiveWidth(20),
            },
            style,
          ]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

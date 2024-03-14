import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {responsiveHeight, responsiveWidth} from '../../utils/util';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const SubLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(140) : responsiveWidth(94)}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
              width: ui.windowWidth,
              backgroundColor: colors.background,
              paddingTop: responsiveWidth(Platform.OS === 'ios' ? 0 : 32),
            },
            style,
          ]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});

import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/util';
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
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

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
              paddingBottom: responsiveWidth(16),
              flex: 1,
              flexDirection: 'column',
              width: ui.windowWidth,
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
});

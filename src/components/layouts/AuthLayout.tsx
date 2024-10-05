import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/util';
import {KeyboardAvoidingView, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveWidth(44) : 0}
      style={{flex: 1}}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.background,
            paddingHorizontal: responsiveWidth(20),
            paddingTop: responsiveWidth(32) + (Platform.OS === 'ios' ? 0 : insets.top),
            paddingBottom: insets.bottom + (Platform.OS === 'ios' ? 0 : responsiveWidth(20)),
          },
          style,
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
});

import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveWidth(96) : 0}
      style={{flex: 1}}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.background,
            paddingBottom: insets.bottom,
          },
          style,
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
});

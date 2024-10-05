import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const SubLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveWidth(100) : 0}
      style={{flex: 1}}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            width: ui.windowWidth,
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

import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsiveWidth} from '../../utils/util';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveWidth(36) : 0}
      style={{flex: 1}}
    >
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? undefined : insets.top,
          paddingBottom: insets.bottom,
          flexDirection: 'column',
        }}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}

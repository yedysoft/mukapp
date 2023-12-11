import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveHeight} from '../../utils/util';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={responsiveHeight(8)}
      style={{flex: 1}}
    >
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>{children}</View>
    </KeyboardAvoidingView>
  );
}

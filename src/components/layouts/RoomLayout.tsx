import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveHeight, responsiveWidth} from '../../utils/util';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(0) : responsiveWidth(0)}
      style={{flex: 1}}
    >
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>{children}</View>
    </KeyboardAvoidingView>
  );
}

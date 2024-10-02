import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>{children}</View>
    </KeyboardAvoidingView>
  );
}

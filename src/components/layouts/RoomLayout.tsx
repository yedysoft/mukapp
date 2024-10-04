import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
}

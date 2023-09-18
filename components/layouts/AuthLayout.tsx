import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode
}

export default function AuthLayout({children}: Props) {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </SafeAreaView>
  );
}

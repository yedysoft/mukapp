import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {View} from 'react-native';

type Props = {
  children: ReactNode
}

export default function MainLayout({children}: Props) {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
}

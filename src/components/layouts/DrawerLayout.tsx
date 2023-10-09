import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
};

export default function DrawerLayout({children}: Props) {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: colors.background}}
    >
      {children}
    </SafeAreaView>
  );
}

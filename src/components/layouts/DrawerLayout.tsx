import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/Responsive';
import {MukTheme} from '../../types';

type Props = {
  children?: ReactNode;
};

export default function DrawerLayout({children}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingVertical: responsiveWidth(8),
      }}
    >
      {children}
    </SafeAreaView>
  );
}

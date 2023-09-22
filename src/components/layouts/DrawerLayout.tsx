import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  children?: ReactNode;
};

export default function DrawerLayout({children}: Props) {
  const {colors} = useTheme();

  return <SafeAreaView style={{flex: 1, backgroundColor: colors.primary, paddingHorizontal: responsiveWidth(20)}}>{children}</SafeAreaView>;
}

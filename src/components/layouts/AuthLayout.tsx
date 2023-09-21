import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveWidth} from "../../utils/Responsive";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({children}: Props) {
  const {colors} = useTheme();

  return <SafeAreaView style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(20)
  }}>{children}</SafeAreaView>;
}

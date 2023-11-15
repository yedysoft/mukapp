import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {View} from 'react-native';
import {MukTheme} from '../../types';

type Props = {
  children: ReactNode;
};

export default function RoomLayout({children}: Props) {
  const {colors} = useTheme<MukTheme>();

  return <View style={{flex: 1, flexDirection: 'column', backgroundColor: colors.background}}>{children}</View>;
}

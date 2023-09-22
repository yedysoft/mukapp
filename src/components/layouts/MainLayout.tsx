import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';

type Props = {
  children: ReactNode;
};

export const MainLayout = observer(({children}: Props) => {
  const {colors} = useTheme();

  return <View style={{flex: 1, flexDirection: 'column'}}>{children}</View>;
});

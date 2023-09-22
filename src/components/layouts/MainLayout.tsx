import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {stores} from '../../stores';
import MukModal from '../custom/MukModal';

type Props = {
  children: ReactNode;
};

export const MainLayout = observer(({children}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {children}
      <MukModal onDismiss={() => stores.ui.set('tooltip', false)} visible={stores.ui.tooltip} />
    </View>
  );
});

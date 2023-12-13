import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import BlockedScreen from './social/BlockedScreen';

export const PsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const {t} = useServices();

  return <BlockedScreen />;
});

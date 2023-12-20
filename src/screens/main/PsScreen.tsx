import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import BlockedScreen from './social/BlockedScreen';
import {MainLayout} from '../../components/layouts/MainLayout';
import MukCard from '../../components/custom/MukCard';

export const PsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {t} = useServices();

  return (
    <MainLayout>
      <MukCard title={t.do('main.ps.blocked')} />
      <BlockedScreen />
    </MainLayout>
  );
});

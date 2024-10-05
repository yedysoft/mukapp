import {observer} from 'mobx-react';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {responsiveWidth} from '../../utils/util';
import PsListItem from '../../components/ps/PsListItem';
import {SubLayout} from '../../components/layouts/SubLayout';

export const PsScreen = observer(() => {
  const {t} = useServices();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <SubLayout style={{paddingHorizontal: responsiveWidth(24), paddingTop: responsiveWidth(16)}}>
      <PsListItem label={t.do('main.ps.blocked')} onPress={() => navigation.navigate('Blocked')} />
    </SubLayout>
  );
});

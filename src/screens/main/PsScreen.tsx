import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {responsiveWidth} from '../../utils/util';
import PsListItem from '../../components/ps/PsListItem';
import {SubLayout} from '../../components/layouts/SubLayout';

export const PsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {t} = useServices();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <SubLayout style={{paddingHorizontal: responsiveWidth(24)}}>
      <PsListItem label={t.do('main.ps.blocked')} onPress={() => navigation.navigate('Blocked')} />
    </SubLayout>
  );
});

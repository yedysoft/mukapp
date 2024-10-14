import {responsiveWidth} from '../../utils/util';
import YedyIconButton from '../custom/YedyIconButton';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import NotificationsTooltip from '../tooltips/NotificationsTooltip';
import {NavButton} from './NavButton';
import Coin from '../user/Coin';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MukLogo from '../custom/MukLogo';

export const MainHeader = observer(() => {
  const navigation = useNavigation<MainStackNavProp>();
  const {user} = useStores();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const tabName =
    route.params && Object.keys(route.params).some(p => p === 'tab') ? String((route.params as any).tab) : '';

  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(8),
        //paddingRight: tabName === 'Shop' ? responsiveWidth(12) : undefined,
        paddingTop: responsiveWidth(8) + (Platform.OS === 'ios' ? 0 : insets.top),
        paddingBottom: responsiveWidth(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: responsiveWidth(4),
      }}
    >
      <NavButton>
        <YedyIconButton icon={'menu'} scale={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </NavButton>
      <MukLogo />
      {tabName === 'Shop kapandı' ? ( // logo ortalamadığı için kapandı
        <Coin />
      ) : (
        <NavButton>
          <YedyIconButton
            defaultBadge={user.getNotifications.some(n => !n.readed)}
            icon={'bell'}
            scale={0.45}
            tooltip={NotificationsTooltip}
          />
        </NavButton>
      )}
    </View>
  );
});

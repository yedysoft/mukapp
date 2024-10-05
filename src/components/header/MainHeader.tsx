import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import MukIconButton from '../custom/MukIconButton';
import MukLogo from '../custom/MukLogo';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import NotificationsTooltip from '../tooltips/NotificationsTooltip';
import {NavButton} from './NavButton';
import Coin from '../user/Coin';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const MainHeader = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute();
  const {user} = useStores();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(8),
        paddingTop: responsiveWidth(16) + (Platform.OS === 'ios' ? 0 : insets.top),
        paddingBottom: responsiveWidth(-16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NavButton>
        <MukIconButton icon={'menu'} scale={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </NavButton>
      <MukLogo />
      <NavButton>
        {route.name === 'Shop' ? (
          <Coin style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(16)}} />
        ) : (
          <MukIconButton
            defaultBadge={Boolean(user.getNotifications.find(n => !n.readed))}
            icon={'bell'}
            scale={0.45}
            tooltip={NotificationsTooltip}
          />
        )}
      </NavButton>
    </View>
  );
});

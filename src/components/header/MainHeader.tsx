import {responsiveWidth} from '../../utils/util';
import {YedyIconButton, YedyLogo} from '../custom';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import NotificationsTooltip from '../tooltips/NotificationsTooltip';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../hooks';

export default observer(() => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {user} = useStores();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(16),
        paddingTop: responsiveWidth(Platform.OS === 'ios' ? 8 : 16) + (Platform.OS === 'ios' ? 0 : insets.top),
        paddingBottom: responsiveWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: responsiveWidth(4),
      }}
    >
      <YedyIconButton icon={'hamburger'} scale={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <YedyLogo />
      <YedyIconButton
        defaultBadge={user.getNotifications.some(n => !n.readed)}
        icon={'alarm-bell'}
        scale={0.5}
        tooltip={NotificationsTooltip}
      />
    </View>
  );
});

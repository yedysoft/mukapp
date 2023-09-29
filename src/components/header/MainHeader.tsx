import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import MukLogo from '../custom/MukLogo';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {NotificationsTooltip} from '../notification/NotificationsTooltip';
import {NavButton} from './NavButton';

export const MainHeader = observer(() => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(8),
        paddingTop: responsiveHeight(16),
        paddingBottom: responsiveHeight(-16),
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
        <MukIconButton icon={'bell-outline'} scale={0.4} tooltip={NotificationsTooltip} />
      </NavButton>
    </SafeAreaView>
  );
});

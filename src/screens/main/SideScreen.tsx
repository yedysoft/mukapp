import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import {useServices} from '../../services';
import MukIconButton from '../../components/custom/MukIconButton';
import {responsiveWidth} from '../../utils/Responsive';
import MenuList from '../../components/menu/MenuList';
import {View} from 'react-native';

const menu = [
  {
    icon: 'account-outline',
    label: 'Profil',
    route: 'Profile',
  },
  {
    icon: 'star-outline',
    label: 'Premium',
    route: 'Premium',
  },
  {
    icon: 'bookmark-outline',
    label: 'Favoriler',
    route: 'Bookmarks',
  },
  {
    icon: 'cog-outline',
    label: 'Ayarlar',
    route: 'Settings',
  },
  {
    icon: 'help',
    label: 'Yardım',
    route: 'Help',
  },
];

export default function SideScreen() {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <DrawerLayout>
      <HorizontalUser/>
      <MenuList menu={menu} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: responsiveWidth(16)}}>
        <MukIconButton icon={'theme-light-dark'} onPress={() => api.auth.logout()} scale={.5} style={{}}/>
        <MukIconButton icon={'logout'} onPress={() => api.auth.logout()} scale={.5} style={{}}
                       color={'rgba(255, 55, 95, 1)'}/>
      </View>
    </DrawerLayout>
  );
}

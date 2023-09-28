import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import {useServices} from '../../services';
import MukIconButton from '../../components/custom/MukIconButton';
import {responsiveWidth} from '../../utils/Responsive';
import MenuList from '../../components/menu/MenuList';
import {View} from 'react-native';
import MenuFooter from '../../components/menu/MenuFooter';

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

  return (
    <DrawerLayout>
      <HorizontalUser/>
      <MenuList menu={menu} />
      <MenuFooter />
    </DrawerLayout>
  );
}

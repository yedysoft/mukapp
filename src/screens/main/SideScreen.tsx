import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import MenuList from '../../components/menu/MenuList';
import MenuFooter from '../../components/menu/MenuFooter';

const menu = [
  {
    icon: 'account-outline',
    label: 'Profil',
    route: 'Profile',
  },
  {
    icon: 'bell-outline',
    label: 'Bildirimler',
    route: 'Notifications',
  },
  {
    icon: 'account-search-outline',
    label: 'Arama',
    route: 'Search',
  },
  {
    icon: 'bookmark-outline',
    label: 'Favoriler',
    route: 'Favorite',
  },
  {
    icon: 'star-outline',
    label: 'Premium',
    route: 'Premium',
    disabled: true,
  },
  {
    icon: 'view-list-outline',
    label: 'Görevler',
    route: 'Task',
    disabled: true,
  },
  {
    icon: 'cog-outline',
    label: 'Ayarlar',
    route: 'Settings',
  },
  {
    icon: 'help-circle-outline',
    label: 'Yardım',
    route: 'Help',
  },
];

export default function SideScreen() {
  const {colors} = useTheme();

  return (
    <DrawerLayout>
      <HorizontalUser />
      <MenuList menu={menu} />
      <MenuFooter />
    </DrawerLayout>
  );
}

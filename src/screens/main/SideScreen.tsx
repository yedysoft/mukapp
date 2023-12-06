import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import MenuList from '../../components/menu/MenuList';
import MenuFooter from '../../components/menu/MenuFooter';
import {MukMenu, MukTheme} from '../../types';

const menu: MukMenu[] = [
  {
    icon: 'user',
    label: 'Profil',
    route: 'Profile',
  },
  {
    icon: 'bell',
    label: 'Bildirimler',
    route: 'Notifications',
  },
  {
    icon: 'search',
    label: 'Arama',
    route: 'Search',
  },

  {
    icon: 'star',
    label: 'Premium',
    route: 'Premium',
    disabled: true,
  },
  {
    icon: 'list',
    label: 'Görevler',
    route: 'Task',
    disabled: true,
  },
];

export default function SideScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <DrawerLayout>
      <HorizontalUser />
      <MenuList menu={menu} />
      <MenuFooter />
    </DrawerLayout>
  );
}

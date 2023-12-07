import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import MenuList from '../../components/menu/MenuList';
import MenuFooter from '../../components/menu/MenuFooter';
import {MukMenu, MukTheme} from '../../types';
import {useServices} from '../../services';

export default function SideScreen() {
  const {colors} = useTheme<MukTheme>();
  const {t} = useServices();

  const menu: MukMenu[] = [
    {
      icon: 'user',
      label: t.do('main.side.profile'),
      route: 'Profile',
    },
    {
      icon: 'bell',
      label: t.do('main.side.notifications'),
      route: 'Notifications',
    },
    {
      icon: 'search',
      label: t.do('main.side.search'),
      route: 'Search',
    },

    {
      icon: 'star',
      label: t.do('main.side.premium'),
      route: 'Premium',
      disabled: true,
    },
    {
      icon: 'list',
      label: t.do('main.side.tasks'),
      route: 'Task',
      disabled: true,
    },
  ];

  return (
    <DrawerLayout>
      <HorizontalUser />
      <MenuList menu={menu} />
      <MenuFooter />
    </DrawerLayout>
  );
}

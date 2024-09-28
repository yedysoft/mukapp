import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import MenuList from '../../components/menu/MenuList';
import MenuFooter from '../../components/menu/MenuFooter';
import {MukMenu} from '../../types';
import {useServices} from '../../services';

export default () => {
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
    {
      icon: 'shield',
      label: t.do('main.side.ps'),
      route: 'PS',
    },
    {
      icon: 'settings',
      label: t.do('main.side.settings'),
      route: 'Settings',
    },
  ];

  return (
    <DrawerLayout>
      <HorizontalUser />
      <MenuList menu={menu} />
      <MenuFooter />
    </DrawerLayout>
  );
};

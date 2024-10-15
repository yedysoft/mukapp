import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import MenuList from '../../components/menu/MenuList';
import MenuFooter from '../../components/menu/MenuFooter';
import {MukMenu} from '../../types';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

export default observer(() => {
  const {t} = useServices();
  const {user} = useStores();

  const menu: MukMenu[] = [
    {
      icon: 'account',
      label: t.do('main.side.profile'),
      route: 'Profile',
      params: {userId: user.getInfo.id},
    },
    {
      icon: 'bell',
      label: t.do('main.side.notifications'),
      route: 'Notifications',
    },
    {
      icon: 'account-search',
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
      icon: 'format-list-checks',
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
      icon: 'cog',
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
});

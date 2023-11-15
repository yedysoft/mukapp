import {MainLayout} from '../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import NotificationsList from '../../components/notifications/NotificationsList';
import {useServices} from '../../services';
import {useEffect} from 'react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

export const NotificationsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();

  useEffect(() => {
    api.user.getFollowRequests();
  }, []);

  return (
    <MainLayout>
      <NotificationsList list={user.getFollowRequests} />
    </MainLayout>
  );
});

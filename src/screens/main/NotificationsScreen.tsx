import {MainLayout} from '../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import NotificationList from '../../components/notification/NotificationList';
import {MukTheme} from '../../types';
import {useEffect} from 'react';
import {useServices} from '../../services';

export const NotificationsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();

  useEffect(() => {
    api.user.updateReaded();
  }, []);

  return (
    <MainLayout>
      <NotificationList compact={false} />
    </MainLayout>
  );
});

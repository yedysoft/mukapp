import {MainLayout} from '../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import NotificationList from '../../components/notification/NotificationList';
import {MukTheme} from '../../types';

export const NotificationsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();

  return (
    <MainLayout>
      <NotificationList compact={false} />
    </MainLayout>
  );
});

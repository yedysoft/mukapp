import {observer} from 'mobx-react';
import NotificationList from '../../components/notification/NotificationList';
import {SubLayout} from '../../components/layouts/SubLayout';

export const NotificationsScreen = observer(() => {
  return (
    <SubLayout>
      <NotificationList compact={false} />
    </SubLayout>
  );
});

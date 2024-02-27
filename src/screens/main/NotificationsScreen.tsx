import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import NotificationList from '../../components/notification/NotificationList';
import {MukTheme} from '../../types';
import {SubLayout} from '../../components/layouts/SubLayout';

export const NotificationsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();

  return (
    <SubLayout>
      <NotificationList compact={false} />
    </SubLayout>
  );
});

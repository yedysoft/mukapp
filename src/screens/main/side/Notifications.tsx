import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../../components/layouts/DrawerLayout';
import HorizontalUser from '../../../components/user/HorizontalUser';
import NotificationList from '../../../components/drawer/notifications/NotificationList';

export default function Notifications() {
  const {colors} = useTheme();

  return (
    <DrawerLayout>
      <HorizontalUser />
      <NotificationList />
    </DrawerLayout>
  );
}

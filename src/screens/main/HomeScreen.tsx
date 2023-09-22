import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import RoomTabs from '../../components/home/RoomTabs';
import CreateRoom from '../../components/home/CreateRoom';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <MainLayout>
      <RoomTabs />
      <CreateRoom />
    </MainLayout>
  );
}

import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import HomeTabs from '../../components/home/HomeTabs';
import CreateRoom from '../../components/home/CreateRoom';
import PlayingTrack from '../../components/room/PlayingTrack';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <MainLayout>
      <HomeTabs />
      <CreateRoom />
    </MainLayout>
  );
}

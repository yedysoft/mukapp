import {useTheme} from 'react-native-paper';
import RoomLayout from '../../../components/layouts/RoomLayout';
import RoomTabs from '../../../components/room/RoomTabs';
import PlayingTrack from '../../../components/room/PlayingTrack';

export default function RoomScreen() {
  const theme = useTheme();

  return (
    <RoomLayout>
      <PlayingTrack />
      <RoomTabs />
    </RoomLayout>
  );
}

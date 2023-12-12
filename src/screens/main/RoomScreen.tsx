import RoomLayout from '../../components/layouts/RoomLayout';
import RoomTabs from '../../components/room/RoomTabs';
import PlayingTrack from '../../components/room/PlayingTrack';

export default function RoomScreen() {
  return (
    <RoomLayout>
      <PlayingTrack />
      <RoomTabs />
    </RoomLayout>
  );
}

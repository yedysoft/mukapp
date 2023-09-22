import {useTheme} from 'react-native-paper';
import RoomLayout from '../../../components/layouts/RoomLayout';
import RoomTabs from '../../../components/room/RoomTabs';

export default function RoomScreen() {
  const {colors} = useTheme();

  return (
    <RoomLayout>
      <RoomTabs />
    </RoomLayout>
  );
}

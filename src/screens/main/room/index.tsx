import {Text, useTheme} from 'react-native-paper';
import RoomLayout from '../../../components/layouts/RoomLayout';

export default function RoomScreen() {
  const {colors} = useTheme();

  return (
    <RoomLayout>
      <Text>Room</Text>
    </RoomLayout>
  );
}

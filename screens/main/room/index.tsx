import {Text, useTheme} from 'react-native-paper';
import MainLayout from '../../../components/layouts/MainLayout';

export default function RoomScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Room</Text>
    </MainLayout>
  );
}

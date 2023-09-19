import {Text, useTheme} from 'react-native-paper';
import MainLayout from '@app/components/layouts/MainLayout';

export default function RoomScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Room</Text>
    </MainLayout>
  );
}

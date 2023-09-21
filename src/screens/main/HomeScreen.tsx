import {useTheme} from 'react-native-paper';
import MainLayout from '../../components/layouts/MainLayout';
import RoomTabs from "../../components/home/RoomTabs";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <MainLayout>
      <RoomTabs />
    </MainLayout>
  );
}

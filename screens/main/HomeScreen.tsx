import {Text, useTheme} from 'react-native-paper';
import MainLayout from '../../components/layouts/MainLayout';

export default function HomeScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Home</Text>
    </MainLayout>
  );
}
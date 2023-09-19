import {Text, useTheme} from 'react-native-paper';
import MainLayout from '../../components/layouts/MainLayout';

export default function ProfileScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Profile</Text>
    </MainLayout>
  );
}

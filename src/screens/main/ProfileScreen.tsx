import {Text, useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalUserProfile from '../../components/user/VerticalUserProfile';

export default function ProfileScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <VerticalUserProfile />
    </MainLayout>
  );
}

import {Text, useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';

export default function ShopScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Shop</Text>
    </MainLayout>
  );
}

import {Text, useTheme} from 'react-native-paper';
import MainLayout from '@app/components/layouts/MainLayout';

export default function ShopScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <Text>Shop</Text>
    </MainLayout>
  );
}

import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight} from '../../utils/Responsive';
import ShopCarousel from '../../components/shop/ShopCarousel';
import ShopCoins from '../../components/shop/ShopCoins';

export default function ShopScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      <ShopCarousel />
      <ShopCoins />
    </MainLayout>
  );
}

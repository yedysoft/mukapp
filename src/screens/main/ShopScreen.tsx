import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight} from '../../utils/Responsive';
import ShopCarousel from '../../components/shop/ShopCarousel';
import ShopWallet from '../../components/shop/ShopWallet';
import ShopCoins from '../../components/shop/ShopCoins';

export default function ShopScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout style={{paddingVertical: responsiveHeight(16), gap: responsiveHeight(32)}}>
      <ShopCarousel />
      <ShopWallet />
      <ShopCoins />
    </MainLayout>
  );
}

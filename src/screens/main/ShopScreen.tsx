import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight} from '../../utils/util';
import ShopCarousel from '../../components/shop/ShopCarousel';
import ShopCoins from '../../components/shop/ShopCoins';
import {ScrollView} from 'react-native';

export default function ShopScreen() {
  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexDirection: 'column'}}
      >
        <ShopCarousel />
        <ShopCoins />
      </ScrollView>
    </MainLayout>
  );
}

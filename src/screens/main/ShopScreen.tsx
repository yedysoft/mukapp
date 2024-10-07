import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import ShopCarousel from '../../components/shop/ShopCarousel';
import ShopCoins from '../../components/shop/ShopCoins';
import {ScrollView, View} from 'react-native';
import Coin from '../../components/user/Coin';
import {useServices} from '../../services';

export default function ShopScreen() {
  const {api} = useServices();

  return (
    <MainLayout>
      <View
        style={{
          padding: responsiveWidth(12),
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {
          //<Token />
        }
        <Coin />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexDirection: 'column', gap: responsiveHeight(8)}}
      >
        <ShopCarousel />
        <ShopCoins title={'Get Coins'} onPress={(value: number) => api.user.addCoin(value)} />
        {
          //<ShopCoins title={'Get Tokens'} onPress={(value: number) => api.user.addToken(value)} />
        }
      </ScrollView>
    </MainLayout>
  );
}

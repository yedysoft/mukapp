import {useTheme} from 'react-native-paper';
import CoinList from './CoinList';
import ShopSection from './ShopSection';

const coins = [
  {
    value: 10,
    source: require('../../../assets/shop/coin1.png'),
    price: 10,
  },
  {
    value: 50,
    source: require('../../../assets/shop/coin2.png'),
    price: 45,
  },
  {
    value: 100,
    source: require('../../../assets/shop/coin3.png'),
    price: 90,
  },
  {
    value: 500,
    source: require('../../../assets/shop/coin4.png'),
    price: 450,
  },
  {
    value: 1000,
    source: require('../../../assets/shop/coin5.png'),
    price: 900,
  },
  {
    value: 2500,
    source: require('../../../assets/shop/coin6.png'),
    price: 2250,
  },
  {
    value: 5000,
    source: require('../../../assets/shop/coin7.png'),
    price: 4500,
  },
];

export default function ShopCoins() {
  const {colors} = useTheme();

  return (
    <ShopSection title={'Mük Coin'}>
      <CoinList coins={coins} />
    </ShopSection>
  );
}

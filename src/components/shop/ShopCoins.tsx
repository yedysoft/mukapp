import CoinList from './CoinList';
import ShopSection from './ShopSection';

const coins = [
  {
    value: 10,
    source: require('../../../assets/shop/coin1.png'),
    price: 1,
  },
  {
    value: 50,
    source: require('../../../assets/shop/coin2.png'),
    price: 5,
  },
  {
    value: 100,
    source: require('../../../assets/shop/coin3.png'),
    price: 10,
  },
  {
    value: 500,
    source: require('../../../assets/shop/coin4.png'),
    price: 50,
  },
  {
    value: 1000,
    source: require('../../../assets/shop/coin5.png'),
    price: 100,
  },
  {
    value: 2500,
    source: require('../../../assets/shop/coin6.png'),
    price: 250,
  },
  {
    value: 5000,
    source: require('../../../assets/shop/coin7.png'),
    price: 500,
  },
];

export default function ShopCoins() {
  return (
    <ShopSection title={'Get Coin'}>
      <CoinList coins={coins} />
    </ShopSection>
  );
}

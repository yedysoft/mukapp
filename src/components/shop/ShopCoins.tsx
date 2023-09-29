import {useTheme} from 'react-native-paper';
import CoinList from './CoinList';
import ShopSection from './ShopSection';

const coins = [
  {
    value: 10,
    price: 10,
  },
  {
    value: 50,
    price: 45,
  },
  {
    value: 100,
    price: 90,
  },
  {
    value: 500,
    price: 450,
  },
  {
    value: 1000,
    price: 900,
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

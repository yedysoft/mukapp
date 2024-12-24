import CoinList from './CoinList';
import ShopSection from './ShopSection';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  title: string;
  onPress: (value: string) => void;
};

export default observer(({title, onPress}: Props) => {
  const {shop} = useStores();

  return (
    <ShopSection title={title}>
      <CoinList coins={shop.coins} onPress={onPress} />
    </ShopSection>
  );
});

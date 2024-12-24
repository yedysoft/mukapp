import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import CoinGridItem from './CoinGridItem';
import {IProduct} from '../../types';

type Props = {
  coins: IProduct[];
  onPress: (value: string) => void;
};

export default function CoinList({coins, onPress}: Props) {
  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => <CoinGridItem key={index} onPress={() => onPress(item.productId)} coin={item} />}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: responsiveWidth(12),
        padding: responsiveWidth(12),
      }}
    />
  );
}

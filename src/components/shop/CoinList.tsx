import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import CoinGridItem from './CoinGridItem';

type Props = {
  coins: {
    value: number;
    source: number;
    price: number;
  }[];
  onPress: (value: number) => void;
};

export default function CoinList({coins, onPress}: Props) {
  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => <CoinGridItem key={index} onPress={() => onPress(item.value)} coin={item} />}
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

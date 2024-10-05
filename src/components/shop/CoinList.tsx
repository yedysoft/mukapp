import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import CoinGridItem from './CoinGridItem';
import {useServices} from '../../services';

type Props = {
  coins: {
    value: number;
    source: number;
    price: number;
  }[];
};

export default function CoinList({coins}: Props) {
  const {api} = useServices();

  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => (
        <CoinGridItem key={index} onPress={() => api.user.addCoin(item.value)} coin={item} />
      )}
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

import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import CoinGridItem from './CoinGridItem';
import {useServices} from '../../services';
import {MukTheme} from '../../types';

type Props = {
  coins: {
    value: number;
    source: number;
    price: number;
  }[];
};

export default function CoinList({coins}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();

  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => (
        <CoinGridItem key={index} onPress={() => api.user.addCoin(item.value)} coin={item} />
      )}
      scrollEnabled
      horizontal
      style={{height: responsiveWidth(420)}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: responsiveWidth(20),
        gap: responsiveWidth(24),
      }}
    />
  );
}

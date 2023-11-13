import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
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
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => (
        <CoinGridItem key={index} onPress={() => api.user.addCoin(item.value)} coin={item} />
      )}
      scrollEnabled
      horizontal
      style={{height: responsiveWidth(280)}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(20),
        gap: responsiveWidth(24),
      }}
    />
  );
}

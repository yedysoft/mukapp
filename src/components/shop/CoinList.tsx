import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {useState} from 'react';
import CoinGridItem from './CoinGridItem';

type Props = {
  coins: {
    value: number;
    price: number;
  }[];
};

export default function CoinList({coins}: Props) {
  const {colors} = useTheme();
  const [playlistIndex, setPlaylistIndex] = useState(0);

  return (
    <FlatList
      data={coins}
      renderItem={({item, index}) => <CoinGridItem key={index} onPress={() => setPlaylistIndex(index)} coin={item} />}
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

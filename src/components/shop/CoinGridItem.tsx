import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {Image, TouchableOpacity, View} from 'react-native';
import {useServices} from '../../services';
import {YedyText} from '../custom';

type Props = {
  onPress?: () => void;
  coin: {
    value: number;
    source: number;
    price: number;
  };
};

export default function CoinGridItem({onPress, coin}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.background,
        height: responsiveWidth(120),
        aspectRatio: 1,
        alignItems: 'center',
        borderRadius: 16,
        flexDirection: 'column',
        gap: responsiveWidth(8),
      }}
    >
      <View style={{flex: 1, width: '100%', padding: responsiveWidth(8)}}>
        <Image resizeMode={'contain'} source={coin.source} style={{width: '100%', height: '100%'}} />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.shadow,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          padding: responsiveWidth(8),
        }}
      >
        <YedyText numberOfLines={1} type={'bold'}>
          {api.helper.nummer(coin.value)}
        </YedyText>
        <YedyText numberOfLines={1} type={'bold'}>
          {coin.price} ₺
        </YedyText>
      </View>
    </TouchableOpacity>
  );
}

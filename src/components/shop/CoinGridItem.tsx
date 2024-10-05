import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MukTheme} from '../../types';
import {useServices} from '../../services';

type Props = {
  onPress?: () => void;
  coin: {
    value: number;
    source: number;
    price: number;
  };
};

export default function CoinGridItem({onPress, coin}: Props) {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles();
  const {api} = useServices();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.background,
          height: responsiveWidth(120),
          aspectRatio: 1,
          alignItems: 'center',
          borderRadius: 16,
          flexDirection: 'column',
          flex: 1,
          gap: responsiveWidth(8),
        },
        styles.shadow,
      ]}
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
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveSize(15),
            fontWeight: '800',
            color: colors.secondary,
          }}
        >
          {api.helper.nummer(coin.value)}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveSize(15),
            fontWeight: '800',
            color: colors.secondary,
          }}
        >
          {coin.price} ₺
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = () =>
  StyleSheet.create({
    shadow: {
      shadowColor: 'rgba(255, 159, 10, 1)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
    },
  });

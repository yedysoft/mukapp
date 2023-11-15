import {useTheme} from 'react-native-paper';
import MukCarousel from '../../components/custom/MukCarousel';
import {View} from 'react-native';
import {MukTheme} from '../../types';

export default function ShopCarousel() {
  const {colors} = useTheme<MukTheme>();

  return (
    <MukCarousel
      carousel={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}
        />
      }
      data={[...new Array(6).keys()]}
    />
  );
}

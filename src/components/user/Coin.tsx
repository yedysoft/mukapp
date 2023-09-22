import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';

export default function Coin() {
  const {colors} = useTheme();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MukImage scale={0.6} source={require('../../../assets/coin.png')} />
      <Text style={{color: 'white', fontSize: responsiveSize(16)}}>1234</Text>
    </View>
  );
}

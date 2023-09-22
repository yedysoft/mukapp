import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import Coin from './Coin';

export default function HorizontalUser() {
  const {colors} = useTheme();

  return (
    <View style={{flexDirection: 'row', gap: responsiveWidth(8)}}>
      <MukImage
        scale={1.2}
        source={require('../../../assets/adaptive-icon.png')}
        style={{borderWidth: 2, borderRadius: 24, borderColor: colors.background, backgroundColor: 'white'}}
      />
      <View style={{flexDirection: 'column', paddingVertical: responsiveWidth(8)}}>
        <Text style={{color: 'white', fontSize: responsiveSize(20)}}>etcas</Text>
        <Coin />
      </View>
    </View>
  );
}

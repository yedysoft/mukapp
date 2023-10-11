import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import Coin from './Coin';
import Token from './Token';
import {useStores} from '../../stores';

export default function HorizontalUser() {
  const {colors} = useTheme();
  const {user} = useStores();
  return (
    <View style={{flexDirection: 'row', gap: responsiveWidth(12), padding: responsiveWidth(16)}}>
      <MukImage
        scale={1.5}
        source={require('../../../assets/adaptive-icon.png')}
        style={{borderWidth: 2, borderRadius: 24, borderColor: colors.primary, backgroundColor: colors.secondary}}
      />
      <View style={{flexDirection: 'column', paddingVertical: responsiveWidth(8), gap: responsiveWidth(12)}}>
        <Text style={{color: colors.secondary, fontSize: responsiveSize(20)}}>@{user.getInfo.userName}</Text>
        <View style={{flexDirection: 'column', justifyContent: 'flex-end', gap: responsiveWidth(4)}}>
          <Coin />
          <Token />
        </View>
      </View>
    </View>
  );
}

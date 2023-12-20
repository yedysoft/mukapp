import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import Coin from './Coin';
import Token from './Token';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

export default function HorizontalUser() {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  return (
    <View style={{flexDirection: 'row', gap: responsiveWidth(12), padding: responsiveWidth(16), overflow: 'hidden'}}>
      <MukImage
        scale={1.5}
        source={require('../../../assets/adaptive-icon.png')}
        style={{borderWidth: 2, borderRadius: 24, borderColor: colors.primary, backgroundColor: colors.background}}
      />
      <View style={{flexDirection: 'column', paddingVertical: responsiveWidth(4), gap: responsiveWidth(8)}}>
        <View style={{gap: 4}}>
          <Text numberOfLines={1} style={{color: colors.secondary, fontSize: responsiveSize(18), maxWidth: '90%'}}>
            {user.getInfo.name} {user.getInfo.surname}
          </Text>
          <Text numberOfLines={1} style={{color: colors.secondary, fontSize: responsiveSize(18)}}>
            @{user.getInfo.userName}
          </Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'flex-end', gap: responsiveWidth(4)}}>
          <Coin />
          <Token />
        </View>
      </View>
    </View>
  );
}

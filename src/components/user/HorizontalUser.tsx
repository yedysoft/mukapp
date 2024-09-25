import {Platform, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import Coin from './Coin';
import Token from './Token';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

export default function HorizontalUser() {
  const {colors} = useTheme<MukTheme>();
  const {user, auth} = useStores();

  console.log(user.getInfo);

  return (
    <View style={{flexDirection: 'row', gap: responsiveWidth(12), padding: responsiveWidth(16), overflow: 'hidden'}}>
      <MukImage
        scale={1.5}
        source={
          user.getInfo.image
            ? {uri: `${user.getInfo.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{borderWidth: 2, borderRadius: 24, borderColor: colors.primary, backgroundColor: colors.background}}
      />
      <View
        style={{
          flexDirection: 'column',
          paddingVertical: responsiveWidth(Platform.OS === 'ios' ? 8 : 4),
          gap: responsiveWidth(Platform.OS === 'ios' ? 12 : 8),
        }}
      >
        <View style={{gap: responsiveWidth(1)}}>
          <Text
            numberOfLines={1}
            style={{color: colors.secondary, fontSize: responsiveSize(18), maxWidth: '90%', fontWeight: '500'}}
          >
            {user.getInfo.name} {user.getInfo.surname}
          </Text>
          <Text numberOfLines={1} style={{color: colors.secondary, fontSize: responsiveSize(18), fontWeight: '300'}}>
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

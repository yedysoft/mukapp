import {View} from 'react-native';
import {YedyImage, YedyText} from '../custom';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import Coin from './Coin';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

export default observer(() => {
  const {colors} = useTheme();
  const {user, auth} = useStores();

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: responsiveWidth(8),
      }}
    >
      <YedyImage
        scale={1.5}
        source={
          user.getInfo.image
            ? {uri: `${user.getInfo.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{
          marginLeft: responsiveWidth(16),
          borderWidth: 2,
          borderRadius: 24,
          borderColor: colors.primary,
          backgroundColor: colors.background,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginRight: responsiveWidth(4),
          paddingVertical: responsiveWidth(4),
          gap: responsiveWidth(4),
        }}
      >
        <View>
          <YedyText numberOfLines={1} type={'bold'} size={18}>
            {user.getInfo.name}
          </YedyText>
          <YedyText numberOfLines={1}>@{user.getInfo.userName}</YedyText>
        </View>
        <View style={{flexDirection: 'column', gap: responsiveWidth(2)}}>
          <Coin />
          {
            //<Token/>
          }
        </View>
      </View>
    </View>
  );
});

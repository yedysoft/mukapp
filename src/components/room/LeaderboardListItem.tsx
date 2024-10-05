import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import MukBadge from '../custom/MukBadge';
import {YedyPalette} from '../../themes/YedyPalette';
import {MukTheme} from '../../types';
import {IRoomLeaderboard} from '../../types/room';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';

type Props = {
  leader: IRoomLeaderboard;
  index: number;
};

const rankColors: {[key: number]: string} = {
  1: YedyPalette.orange_dark,
  2: YedyPalette.gray500_dark,
  3: YedyPalette.brown_dark,
};

export default observer(({leader, index}: Props) => {
  const navigation = useNavigation<MainStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {auth} = useStores();
  const rankColor = rankColors[index] ?? colors.secondary;

  return (
    <MukListItem
      style={{
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Profile', {userId: leader.userId})}
    >
      {index === 0 ? null : (
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveSize(28),
            fontWeight: '900',
            color: rankColor,
            minWidth: responsiveWidth(40),
            textAlign: 'center',
          }}
        >
          {index}
        </Text>
      )}
      <MukImage
        scale={1}
        source={
          leader.image
            ? {uri: `${leader.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{borderRadius: 100, borderWidth: 2, borderColor: rankColor}}
      />
      <Text numberOfLines={1} style={{flex: 1, fontSize: responsiveSize(16), fontWeight: '600', color: rankColor}}>
        {leader.userName}
      </Text>
      <MukBadge
        badge={leader.voteCount}
        style={{
          minWidth: responsiveWidth(36),
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: index === 0 ? colors.background : colors.backdrop,
          borderWidth: 4,
          borderColor: colors.primary,
        }}
        textStyle={{color: colors.secondary, fontSize: responsiveSize(16)}}
      />
    </MukListItem>
  );
});

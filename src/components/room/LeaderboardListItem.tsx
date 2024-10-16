import {useTheme} from '../../hooks';
import {YedyBadge, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {YedyPalette} from '../../themes/YedyPalette';
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
  const {colors} = useTheme();
  const {auth} = useStores();
  const rankColor = rankColors[index] ?? colors.secondary;

  return (
    <YedyListItem
      style={{
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Profile', {userId: leader.userId})}
    >
      {index === 0 ? null : (
        <YedyText
          numberOfLines={1}
          type={'bold'}
          size={28}
          color={rankColor}
          style={{minWidth: responsiveWidth(40), textAlign: 'center'}}
        >
          {index}
        </YedyText>
      )}
      <YedyImage
        scale={1}
        source={
          leader.image
            ? {uri: `${leader.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{borderRadius: 100, borderWidth: 2, borderColor: rankColor}}
      />
      <YedyText numberOfLines={1} type={'bold'} size={16} color={rankColor} style={{flex: 1}}>
        {leader.userName}
      </YedyText>
      <YedyBadge
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
    </YedyListItem>
  );
});

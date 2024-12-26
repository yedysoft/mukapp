import {useTheme} from '../../hooks';
import {YedyBadge, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
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
        alignContent: 'center',
      }}
      onPress={() => navigation.navigate('Profile', {userId: leader.userId})}
    >
      {index === 0 ? null : (
        <YedyText numberOfLines={1} type={'bold'} size={28} color={rankColor}>
          {index}
        </YedyText>
      )}
      <YedyImage
        scale={0.7}
        source={
          leader.image
            ? {uri: `${leader.image.link}?token=${auth.authToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{borderRadius: 100, borderWidth: 2, borderColor: rankColor}}
      />
      <YedyText numberOfLines={1} type={'bold'} size={16} color={rankColor} style={{flex: 1}}>
        {leader.userName}
      </YedyText>
      <YedyBadge
        badge={leader.voteCount}
        scale={1}
        style={{
          position: undefined,
          backgroundColor: colors.background,
          borderWidth: responsiveWidth(3),
          borderColor: colors.primary,
          alignSelf: 'center',
          top: undefined,
          right: undefined,
        }}
        textStyle={{color: colors.secondary}}
      />
    </YedyListItem>
  );
});

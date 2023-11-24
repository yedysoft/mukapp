import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import MukBadge from '../custom/MukBadge';
import {YedyPalette} from '../../themes/YedyPalette';
import {MukTheme} from '../../types';

type Props = {
  leader: any;
  index: number;
};

const LeaderboardListItem = observer(({leader, index}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const rank = index + 1;
  let rankColor;

  switch (rank) {
    case 1:
      rankColor = YedyPalette.orange_dark;
      break;
    case 2:
      rankColor = YedyPalette.gray500_dark;
      break;
    case 3:
      rankColor = YedyPalette.brown_dark;
      break;
    default:
      rankColor = colors.secondary;
  }

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}}>
      <View
        style={{
          justifyContent: 'center',
          gap: responsiveWidth(16),
          maxWidth: responsiveWidth(240),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveSize(24),
            fontWeight: '900',
            color: rankColor,
            minWidth: responsiveWidth(40),
            textAlign: 'center',
          }}
        >
          {rank}
        </Text>
        <MukImage
          scale={1}
          source={require('../../../assets/adaptive-icon.png')}
          style={{borderRadius: 100, borderWidth: 1, borderColor: rankColor}}
        />
        <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '600', color: rankColor}}>
          Tester {index}
        </Text>
      </View>
      <MukBadge badge={32} style={{paddingVertical: responsiveWidth(8)}} />
    </MukListItem>
  );
});

export default LeaderboardListItem;

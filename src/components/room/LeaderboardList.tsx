import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import LeaderboardListItem from './LeaderboardListItem';

type Props = {
  leaderboard: any[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
  onStartReached?: () => void;
};

export default function LeaderboardList({leaderboard, header, onEndReached, footer, onStartReached}: Props) {
  return (
    <FlatList
      onStartReached={onStartReached}
      data={leaderboard}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      renderItem={({item, index}) => <LeaderboardListItem key={index} index={index} leader={item} />}
      scrollEnabled
      onEndReached={onEndReached}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

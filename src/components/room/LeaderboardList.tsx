import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import LeaderboardListItem from './LeaderboardListItem';

type Props = {
  leaderboard: any[];
  header?: ReactElement;
  onScrollBeginDrag?: () => void;
  footer?: ReactElement;
};

export default function LeaderboardList({leaderboard, header, onScrollBeginDrag, footer}: Props) {
  return (
    <FlatList
      onScrollBeginDrag={onScrollBeginDrag}
      data={leaderboard}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      renderItem={({item, index}) => <LeaderboardListItem key={index} index={index} leader={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import LeaderboardListItem from './LeaderboardListItem';
import {YedyEmptyList} from '../custom';

type Props = {
  leaderboard: any[];
  onRefresh?: () => void;
  loading?: boolean;
};

export default function LeaderboardList({leaderboard, onRefresh, loading}: Props) {
  return (
    <FlatList
      refreshing={loading}
      onRefresh={onRefresh}
      data={leaderboard}
      ListEmptyComponent={<YedyEmptyList />}
      renderItem={({item, index}) => <LeaderboardListItem key={index} index={index} leader={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import LeaderboardListItem from './LeaderboardListItem';
import {YedyImage} from '../custom';

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
      ListEmptyComponent={
        <YedyImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      }
      renderItem={({item, index}) => <LeaderboardListItem key={index} index={index} leader={item} />}
      scrollEnabled
      style={{display: loading ? 'none' : 'flex'}}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

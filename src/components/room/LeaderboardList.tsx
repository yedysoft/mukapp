import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import LeaderboardListItem from './LeaderboardListItem';
import LoaderView from '../loading/LoaderView';

type Props = {
  leaderboard: any[];
  header?: ReactElement;
  onRefresh?: () => void;
  footer?: ReactElement;
  loading?: boolean;
};

export default function LeaderboardList({leaderboard, header, onRefresh, footer, loading}: Props) {
  return (
    <>
      <FlatList
        refreshing={loading}
        onRefresh={onRefresh}
        data={leaderboard}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({item, index}) => <LeaderboardListItem key={index} index={index} leader={item} />}
        scrollEnabled
        style={{display: loading ? 'none' : 'flex'}}
        contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      />
      <LoaderView style={{display: loading ? 'flex' : 'none'}} />
    </>
  );
}

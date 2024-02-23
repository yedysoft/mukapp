import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import LeaderboardListItem from './LeaderboardListItem';
import LoaderView from '../loading/LoaderView';
import MukImage from '../custom/MukImage';

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
      {!leaderboard ? (
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      ) : (
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
      )}
      <LoaderView style={{display: loading ? 'flex' : 'none'}} />
    </>
  );
}

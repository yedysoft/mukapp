import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import SongListItem from './SongListItem';
import {IQueueTrack, ITrack} from '../../types/media';
import {ReactElement} from 'react';
import {YedyLoaderView} from '../custom';

type Props = {
  songs: IQueueTrack[] | ITrack[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
  loading?: boolean;
  itemType: 'vote' | 'add';
  onRefresh?: () => void;
};

export default function SongList({songs, header, onEndReached, footer, loading, itemType, onRefresh}: Props) {
  return (
    <>
      <FlatList
        refreshing={loading}
        onRefresh={onRefresh}
        data={songs}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        keyExtractor={(item: any, index: number) => item.id + index}
        renderItem={({item, index}) => <SongListItem key={index} song={item} itemType={itemType} />}
        scrollEnabled
        onEndReached={onEndReached}
        style={{display: loading ? 'none' : 'flex'}}
        contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      />
      <YedyLoaderView style={{display: loading ? 'flex' : 'none'}} />
    </>
  );
}

import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import SongListItem from './SongListItem';
import {IQueueTrack, ITrack} from '../../types/media';
import {ReactElement} from 'react';
import LoaderView from '../loading/LoaderView';

type Props = {
  songs: IQueueTrack[] | ITrack[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
  loading?: boolean;
  itemType: 'vote' | 'add';
  onScrollBeginDrag?: () => void;
};

export default function SongList({songs, header, onEndReached, footer, loading, itemType, onScrollBeginDrag}: Props) {
  return (
    <>
      <FlatList
        onScrollBeginDrag={onScrollBeginDrag}
        data={songs}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({item, index}) => <SongListItem key={index} song={item} itemType={itemType} />}
        scrollEnabled
        onEndReached={onEndReached}
        style={{display: loading ? 'none' : 'flex'}}
        contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      />
      <LoaderView style={{display: loading ? 'flex' : 'none'}} />
    </>
  );
}

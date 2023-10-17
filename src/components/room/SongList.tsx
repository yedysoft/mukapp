import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
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
};

export default function SongList({songs, header, onEndReached, footer, loading}: Props) {
  return (
    <>
      <FlatList
        data={songs}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({item, index}) => <SongListItem key={index} song={item} />}
        scrollEnabled
        onEndReached={onEndReached}
        style={{display: loading ? 'none' : 'flex'}}
        contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      />
      <LoaderView style={{display: loading ? 'flex' : 'none'}} />
    </>
  );
}

import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import SongListItem from './SongListItem';
import {IQueueTrack, ITrack} from '../../types/media';
import {ReactElement} from 'react';

type Props = {
  songs: IQueueTrack[] | ITrack[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
};

export default function SongList({songs, header, onEndReached, footer}: Props) {
  return (
    <FlatList
      data={songs}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      renderItem={({item, index}) => <SongListItem key={index} song={item} />}
      scrollEnabled
      onEndReached={onEndReached}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import SongListItem from './SongListItem';
import {IQueueTrack, ITrack} from '../../types/media';
import {ReactElement} from 'react';

type Props = {
  songs: IQueueTrack[] | ITrack[];
  header?: ReactElement;
};

export default function SongList({songs, header}: Props) {
  return (
    <FlatList
      data={songs}
      ListHeaderComponent={header}
      renderItem={({item, index}) => <SongListItem key={index} song={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

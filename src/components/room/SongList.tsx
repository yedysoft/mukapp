import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import SongListItem from './SongListItem';
import {IQueueTrack, ITrack} from '../../types/media';

type Props = {
  songs: IQueueTrack[] | ITrack[];
};

export default function SongList({songs}: Props) {
  return (
    <FlatList
      data={songs}
      renderItem={({item, index}) => <SongListItem key={index} song={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

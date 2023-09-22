import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import PlaylistItem from './PlaylistItem';
import SongList from './SongList';
import {useState} from 'react';

type Props = {
  playlists: {
    image?: string;
    name?: string;
    playlist?: {
      image?: string;
      name?: string;
      artist?: string;
    }[];
  }[];
};

export default function PlaylistList({playlists}: Props) {
  const {colors} = useTheme();
  const [playlistIndex, setPlaylistIndex] = useState(0);

  return (
    <>
      <FlatList
        data={playlists}
        renderItem={({item, index}) => <PlaylistItem key={index} onPress={() => setPlaylistIndex(index)} playlist={item} />}
        scrollEnabled
        horizontal
        contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      />
      <SongList songs={playlists[playlistIndex].playlist} />
    </>
  );
}

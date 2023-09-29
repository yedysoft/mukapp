import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import PlaylistListItem from './PlaylistListItem';
import SongList from './SongList';
import {useState} from 'react';
import {IPlaylist} from '../../types/media';

type Props = {
  playlists: IPlaylist[];
};

export default function PlaylistList({playlists}: Props) {
  const [playlistIndex, setPlaylistIndex] = useState(0);

  return (
    <>
      <FlatList
        data={playlists}
        renderItem={({item, index}) => (
          <PlaylistListItem key={index} active={playlistIndex === index} onPress={() => setPlaylistIndex(index)} playlist={item} />
        )}
        scrollEnabled
        horizontal
        style={{height: responsiveWidth(280)}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: responsiveWidth(16),
          gap: responsiveWidth(24),
        }}
      />
      <SongList songs={playlists[playlistIndex].tracks} />
    </>
  );
}

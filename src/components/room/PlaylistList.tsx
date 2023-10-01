import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import PlaylistListItem from './PlaylistListItem';
import {useState} from 'react';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';

type Props = {
  playlists: IPlaylist[];
};

export default function PlaylistList({playlists}: Props) {
  const [playlistIndex, setPlaylistIndex] = useState(-1);
  const {api} = useServices();

  const changePlaylist = (item: IPlaylist, index: number) => {
    api.media.getPlaylistTracks(item.id, 100, 0);
    setPlaylistIndex(index);
  };

  return (
    <FlatList
      data={playlists}
      renderItem={({item, index}) => (
        <PlaylistListItem
          key={index}
          active={playlistIndex === index}
          onPress={() => changePlaylist(item, index)}
          playlist={item}
        />
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
  );
}

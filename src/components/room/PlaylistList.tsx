import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import PlaylistListItem from './PlaylistListItem';
import {useState} from 'react';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';
import MukTextInput from '../custom/MukTextInput';
import {useTheme} from 'react-native-paper';

type Props = {
  playlists: IPlaylist[];
};

export default function PlaylistList({playlists}: Props) {
  const {colors} = useTheme();
  const [playlistId, setPlaylistId] = useState('search');
  const {api} = useServices();

  const changePlaylist = (item: IPlaylist) => {
    item.tracks.count === 0 && api.media.getPlaylistTracks(item.id);
    setPlaylistId(item.id);
  };

  return (
    <>
      <FlatList
        data={playlists}
        renderItem={({item, index}) => (
          <PlaylistListItem
            key={index}
            active={playlistId === item.id}
            onPress={() => changePlaylist(item)}
            playlist={item}
          />
        )}
        scrollEnabled
        horizontal
        style={{height: responsiveWidth(180)}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(16),
          paddingVertical: responsiveWidth(4),
          gap: responsiveWidth(24),
        }}
      />
      {playlistId === 'search' && <MukTextInput name={'search'} outlineStyle={{borderColor: colors.primary}} style={{alignSelf: 'center', width: '92%', marginVertical: responsiveWidth(8)}}/>}
    </>
  );
}

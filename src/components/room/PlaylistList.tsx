import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import PlaylistListItem from './PlaylistListItem';
import {useState} from 'react';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';
import MukTextInput from '../custom/MukTextInput';
import {useTheme} from 'react-native-paper';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

type Props = {
  playlists: IPlaylist[];
};

const PlaylistList = observer(({playlists}: Props) => {
  const {colors} = useTheme();
  const [playlistId, setPlaylistId] = useState('search');
  const {api} = useServices();
  const {loading, media} = useStores();

  const changePlaylist = (item: IPlaylist) => {
    !loading.getPlaylistTracks && api.media.getPlaylistTracks(item.id, item.tracks.count === 0);
    setPlaylistId(item.id);
  };

  const handleSearch = (name: string, value: string) => {
    api.helper.sleep(500).then(() => {
      if (media.getSearchValue !== value) {
        !loading.getPlaylistTracks &&
          api.media.getPlaylistTracks('search', false, value, media.getSearchValue !== value);
      }
    });
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
      {playlistId === 'search' && (
        <MukTextInput
          name={'search'}
          outlineStyle={{borderColor: colors.primary}}
          onChange={handleSearch}
          style={{alignSelf: 'center', width: '92%', marginVertical: responsiveWidth(8)}}
        />
      )}
    </>
  );
});

export default PlaylistList;

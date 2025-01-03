import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import PlaylistListItem from './PlaylistListItem';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';
import {YedyTextInput} from '../custom';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

type Props = {
  playlists: IPlaylist[];
};

const PlaylistList = observer(({playlists}: Props) => {
  const playlistId = playlists.find(p => p.selected)?.id;
  const {api} = useServices();
  const {loading, media} = useStores();

  const changePlaylist = (item: IPlaylist) => {
    console.log('!loading.getPlaylistTracks: ', !loading.playlistTracks);
    !loading.playlistTracks && api.media.getPlaylistTracks(item.id, item.tracks.count > 0);
  };

  const handleSearch = (_name: string, value: string | number | undefined) => {
    api.helper.sleep(500, 'searchSong').then(() => {
      if (media.searchValue !== value) {
        !loading.playlistTracks &&
          api.media.getPlaylistTracks('search', false, String(value), media.searchValue !== value);
      }
    });
  };

  return (
    <>
      <FlatList
        data={playlists}
        renderItem={({item, index}) => (
          <PlaylistListItem key={index} active={item.selected} onPress={() => changePlaylist(item)} playlist={item} />
        )}
        scrollEnabled
        horizontal
        style={{height: responsiveWidth(180)}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(16),
          paddingVertical: responsiveWidth(4),
          gap: responsiveWidth(12),
        }}
      />
      {playlistId === 'search' && (
        <YedyTextInput
          name={'search'}
          onCustomChange={handleSearch}
          placeholder={'Search'}
          viewStyle={{
            alignSelf: 'center',
            width: '92%',
            marginBottom: responsiveWidth(8),
          }}
          showError={false}
        />
      )}
    </>
  );
});

export default PlaylistList;

import MukTabs from '../../components/custom/MukTabs';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useEffect} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';
import {useTheme} from 'react-native-paper';
import LeaderboardList from './LeaderboardList';
import RoomSettingsList from './RoomSettingsList';
import MukLoader from '../loading/MukLoader';
import {MukTheme} from '../../types';

const RoomTabs = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {media, room, loading} = useStores();
  const selectedPlaylist = api.helper.getSelectedPlaylist(media.getPlaylists);

  useEffect(() => {
    api.media.getCurrentUserPlaylists();
    api.room.setLeaderboard();
  }, []);

  return (
    <MukTabs
      defaultIndex={1}
      tabs={[
        {
          icon: 'message-outline',
          children: <MukChat sendMessage={api.subscription.sendPublicMessage} messages={room.chat} />,
        },
        {
          icon: 'playlist-music-outline',
          children: <SongList itemType={'vote'} songs={media.getQueue} />,
        },
        {
          icon: 'playlist-plus',
          children: (
            <SongList
              itemType={'add'}
              loading={loading.getUserPlaylist}
              header={<PlaylistList playlists={media.getPlaylists} />}
              footer={<MukLoader loading={loading.getPlaylistTracks} />}
              songs={selectedPlaylist ? selectedPlaylist.tracks.items : []}
              onEndReached={() =>
                !loading.getUserPlaylist &&
                !loading.getPlaylistTracks &&
                selectedPlaylist &&
                api.media.getPlaylistTracks(selectedPlaylist?.id, false, media.getSearchValue)
              }
              onScrollBeginDrag={() => api.media.getCurrentUserPlaylists()}
            />
          ),
        },
        {
          icon: 'crown-outline',
          children: (
            <LeaderboardList loading={loading.getLeaderboard} onScrollBeginDrag={() => api.room.setLeaderboard()} leaderboard={room.getLeaderboard} />
          ),
        },
        {
          icon: 'cog-outline',
          children: <RoomSettingsList settings={[...Array(3)]} />,
        },
      ]}
    />
  );
});

export default RoomTabs;

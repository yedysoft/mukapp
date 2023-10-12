import MukTabs from '../../components/custom/MukTabs';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useState} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';
import {useTheme} from 'react-native-paper';
import LeaderboardList from './LeaderboardList';
import RoomSettingsList from './RoomSettingsList';
import LeaderboardListItem from './LeaderboardListItem';
import MukLoader from '../custom/MukLoader';

const RoomTabs = observer(() => {
  const {colors} = useTheme();
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const {media, room} = useStores();
  const {api} = useServices();

  if (!playlistLoading) {
    api.media.getCurrentUserPlaylists().then(() => setPlaylistLoading(true));
  }

  const selectedPlaylist = api.helper.getSelectedPlaylist(media.getPlaylists);

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
          children: <SongList songs={media.getQueue} />,
        },
        {
          icon: 'playlist-plus',
          children: (
            <SongList
              header={<PlaylistList playlists={media.getPlaylists} />}
              footer={<MukLoader isLoading={playlistLoading} />}
              songs={selectedPlaylist ? selectedPlaylist?.tracks.items : []}
              onEndReached={() => selectedPlaylist && api.media.getPlaylistTracks(selectedPlaylist?.id)}
            />
          ),
        },
        {
          icon: 'crown-outline',
          children: (
            <LeaderboardList header={<LeaderboardListItem index={31} leader={'any'} />} leaderboard={[...Array(10)]} />
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

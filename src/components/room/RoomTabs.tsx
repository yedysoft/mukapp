import {YedyButton, YedyChat, YedyTabs} from '../custom';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useEffect, useState} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';
import LeaderboardList from './LeaderboardList';
import SpotifyIcon from '../spotify/SpotifyIcon';

export default observer(() => {
  //const {colors} = useTheme();
  const [tabIndex, setTabIndex] = useState(1);
  const {api} = useServices();
  const {media, room, loading} = useStores();
  //const selectedPlaylist = api.helper.getSelectedPlaylist(media.getPlaylists);

  useEffect(() => {
    //api.media.getCurrentUserPlaylists();
    api.room.setLeaderboard();
  }, []);

  return (
    <YedyTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      activeIndex={tabIndex}
      tabs={[
        {
          icon: 'chat-outline',
          children: (
            <YedyChat
              sendMessage={api.subscription.sendMessage}
              messages={room.chat}
              receiverId={room.sessionId ?? ''}
              messageType={'PUBLIC'}
            />
          ),
        },
        {
          icon: 'menu',
          children: (
            <SongList
              itemType={'vote'}
              songs={media.queue}
              footer={
                <YedyButton
                  onPress={() => api.helper.openURL('spotify://')}
                  buttonStyle={{paddingVertical: 0, paddingHorizontal: 0, gap: 0}}
                >
                  <SpotifyIcon color={'black'} spotifyText={'Open Spotify'} />
                </YedyButton>
              }
            />
          ),
        },
        /*{
          icon: 'plus-circle',
          children: (
            <SongList
              itemType={'add'}
              loading={loading.getUserPlaylist}
              header={<PlaylistList playlists={media.getPlaylists} />}
              footer={
                selectedPlaylist?.tracks.items.length === 0 || media.getPlaylists.length === 0 ? (
                  <YedyEmptyList />
                ) : (
                  <YedyLoader loading={loading.getPlaylistTracks} />
                )
              }
              songs={selectedPlaylist?.tracks.items ?? []}
              onEndReached={() => {
                !loading.getUserPlaylist &&
                  !loading.getPlaylistTracks &&
                  selectedPlaylist &&
                  selectedPlaylist.tracks.count > 0 &&
                  api.media.getPlaylistTracks(selectedPlaylist.id, false, media.getSearchValue);
              }}
              onRefresh={() => api.media.getCurrentUserPlaylists()}
            />
          ),
        },*/
        {
          icon: 'trophy-award',
          children: (
            <LeaderboardList
              loading={loading.leaderboard}
              onRefresh={api.room.setLeaderboard}
              leaderboard={room.leaderboard}
            />
          ),
        },
        /*{
          icon: 'settings',
          children: <RoomSettingsList settings={[...Array(3)]} />,
        },*/
      ]}
    />
  );
});

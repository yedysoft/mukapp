import MukTabs from '../../components/custom/MukTabs';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useEffect, useState} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';
import LeaderboardList from './LeaderboardList';
import MukImage from '../custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import MukButton from '../custom/MukButton';
import SpotifyIcon from '../spotify/SpotifyIcon';

export default observer(() => {
  //const {colors} = useTheme<MukTheme>();
  const [tabIndex, setTabIndex] = useState(1);
  const {api} = useServices();
  const {media, room, loading} = useStores();
  //const selectedPlaylist = api.helper.getSelectedPlaylist(media.getPlaylists);

  useEffect(() => {
    //api.media.getCurrentUserPlaylists();
    api.room.setLeaderboard();
  }, []);

  return (
    <MukTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      activeIndex={tabIndex}
      tabs={[
        {
          icon: 'message-circle',
          children: (
            <MukChat
              sendMessage={api.subscription.sendMessage}
              messages={room.getChat}
              receiverId={room.getSessionId ?? ''}
              messageType={'PUBLIC'}
            />
          ),
        },
        {
          icon: 'menu',
          children: (
            <SongList
              itemType={'vote'}
              songs={media.getQueue}
              footer={
                media.getQueue.length === 0 ? (
                  <MukImage
                    source={require('../../../assets/noimage-gray.png')}
                    scale={2}
                    style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
                  />
                ) : (
                  <MukButton
                    onPress={() => api.helper.openURL('spotify://')}
                    scale={0.25}
                    buttonStyle={{margin: responsiveWidth(16)}}
                  >
                    <SpotifyIcon color={'black'} spotifyText={'Open Spotify'} />
                  </MukButton>
                )
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
                  <MukImage
                    source={require('../../../assets/noimage-gray.png')}
                    scale={2}
                    style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
                  />
                ) : (
                  <MukLoader loading={loading.getPlaylistTracks} />
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
          icon: 'award',
          children: (
            <LeaderboardList
              loading={loading.getLeaderboard}
              onRefresh={api.room.setLeaderboard}
              leaderboard={room.getLeaderboard}
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

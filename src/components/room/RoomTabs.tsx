import MukTabs from '../../components/custom/MukTabs';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useEffect, useState} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';
import {useTheme} from 'react-native-paper';
import LeaderboardList from './LeaderboardList';
import RoomSettingsList from './RoomSettingsList';
import MukLoader from '../loading/MukLoader';
import {MukTheme} from '../../types';
import MukImage from '../custom/MukImage';
import {responsiveWidth} from '../../utils/util';

const RoomTabs = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const [tabIndex, setTabIndex] = useState(1);
  const {api} = useServices();
  const {media, room, loading} = useStores();
  const selectedPlaylist = api.helper.getSelectedPlaylist(media.getPlaylists);

  useEffect(() => {
    api.media.getCurrentUserPlaylists();
    api.room.setLeaderboard();
  }, []);

  return (
    <MukTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      activeIndex={tabIndex}
      tabs={[
        {
          icon: 'message-circle',
          children: <MukChat sendMessage={api.subscription.sendPublicMessage} messages={room.chat} />,
        },
        {
          icon: 'play-circle',
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
                ) : undefined
              }
            />
          ),
        },
        {
          icon: 'plus-circle',
          children: (
            <SongList
              itemType={'add'}
              loading={loading.getUserPlaylist}
              header={<PlaylistList playlists={media.getPlaylists} />}
              footer={
                selectedPlaylist?.tracks.items.length === 0 ? (
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
        },
        {
          icon: 'award',
          children: (
            <LeaderboardList
              loading={loading.getLeaderboard}
              onRefresh={() => api.room.setLeaderboard()}
              leaderboard={room.getLeaderboard}
            />
          ),
        },
        {
          icon: 'settings',
          children: <RoomSettingsList settings={[...Array(3)]} />,
        },
      ]}
    />
  );
});

export default RoomTabs;

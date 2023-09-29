import MukTabs from '../../components/custom/MukTabs';
import SongList from './SongList';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useState} from 'react';
import {useServices} from '../../services';

const RoomTabs = observer(() => {
  const {media} = useStores();
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const {api} = useServices();

  if (!playlistLoading) {
    api.media.getCurrentUserPlaylists().then(() => setPlaylistLoading(true));
  }

  return (
    <MukTabs
      defaultIndex={1}
      tabs={[
        {
          icon: 'message-outline',
          children: (
            <MukChat
              subDestination={'/room/3c7c9b06-c3a5-450c-91f5-5da61cb2f4b8/publicChat'}
              sendDestination={'/app/room/3c7c9b06-c3a5-450c-91f5-5da61cb2f4b8/sendPublicMessage'}
            />
          ),
        },
        {
          icon: 'playlist-music-outline',
          children: <SongList songs={media.getQueue} />,
        },
        {
          icon: 'playlist-plus',
          children: <PlaylistList playlists={media.getPlaylists} />,
        },
      ]}
    />
  );
});

export default RoomTabs;

import MukTabs from '../../components/custom/MukTabs';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useState} from 'react';
import {useServices} from '../../services';
import SongList from './SongList';

const RoomTabs = observer(() => {
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const {media, room} = useStores();
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
              songs={api.helper.getSelectedPlaylistTracks(media.getPlaylists)}
            />
          ),
        },
      ]}
    />
  );
});

export default RoomTabs;

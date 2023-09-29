import MukTabs from '../../components/custom/MukTabs';
import SongList from './SongList';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

const RoomTabs = observer(() => {
  const {media} = useStores();

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
          icon: 'earth',
          children: <SongList songs={media.getQueue} />,
        },
        {
          icon: 'account-group-outline',
          children: <PlaylistList playlists={media.getPlaylists} />,
        },
      ]}
    />
  );
});

export default RoomTabs;

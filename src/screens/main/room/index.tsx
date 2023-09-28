import {useTheme} from 'react-native-paper';
import RoomLayout from '../../../components/layouts/RoomLayout';
import RoomTabs from '../../../components/room/RoomTabs';
import PlayingTrack from '../../../components/room/PlayingTrack';
import {useEffect} from 'react';
import {useServices} from '../../../services';
import {Message} from '@stomp/stompjs/esm6';
import {useStores} from '../../../stores';

export default function RoomScreen() {
  const theme = useTheme();
  const {api} = useServices();
  const {user} = useStores();

  useEffect(() => {
    const listenId = api.socket.subscribe(`/room/${user.getInfo.id}/playingTrack`, listenPlayingTrack);
    const liveId = api.socket.subscribe('/live/room/admin');
    return () => {
      listenId ?? api.socket.unsubscribe(listenId);
      liveId ?? api.socket.unsubscribe(liveId);
    };
  }, []);

  const listenPlayingTrack = (message: Message) => {
    api.media.setPlayingTrack(JSON.parse(message.body));
  };

  return (
    <RoomLayout>
      <PlayingTrack />
      <RoomTabs />
    </RoomLayout>
  );
}

import RoomLayout from '../../components/layouts/RoomLayout';
import RoomTabs from '../../components/room/RoomTabs';
import PlayingTrack from '../../components/room/PlayingTrack';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useStores} from '../../stores';

export default function RoomScreen() {
  const navigation = useNavigation();
  const {room} = useStores();

  useEffect(() => {
    navigation.addListener('focus', () => {
      room.set('isRoomPageOn', true);
    });
    navigation.addListener('beforeRemove', () => {
      room.set('isRoomPageOn', false);
    });
  }, []);
  return (
    <RoomLayout>
      <PlayingTrack />
      <RoomTabs />
    </RoomLayout>
  );
}

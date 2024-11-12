import {useTheme} from '../../hooks';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {useEffect} from 'react';
import {YedyEmptyList} from '../custom';

type Props = {
  type: 'PLACE' | 'STREAMER';
};

export default observer(({type}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {loading, room} = useStores();
  const rooms = type === 'PLACE' ? room.places : room.users;

  const handleRefresh = () => !loading.roomList && api.room.getRooms(type);

  useEffect(() => {
    api.room.getRooms(type, false);
  }, []);

  return (
    <FlatList
      refreshing={loading.roomList}
      onRefresh={handleRefresh}
      data={rooms}
      renderItem={({item, index}) => <RoomListItem key={index} roomData={item} />}
      scrollEnabled
      ListEmptyComponent={<YedyEmptyList />}
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(16),
        gap: responsiveWidth(8),
        backgroundColor: colors.background,
      }}
    />
  );
});

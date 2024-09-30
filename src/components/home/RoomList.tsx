import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {MukTheme} from '../../types';
import MukImage from '../custom/MukImage';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {useEffect} from 'react';

type Props = {
  type: 'PLACE' | 'STREAMER';
};

export default observer(({type}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {loading, room} = useStores();
  const rooms = type === 'PLACE' ? room.getPlaces : room.getUsers;

  const handleRefresh = () => !loading.getRoomList && api.room.getRooms(type);

  useEffect(() => {
    api.room.getRooms(type, false);
  }, []);

  return (
    <FlatList
      refreshing={loading.getRoomList}
      onRefresh={handleRefresh}
      data={rooms}
      renderItem={({item, index}) => <RoomListItem key={index} roomData={item} />}
      scrollEnabled
      ListEmptyComponent={
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={3}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      }
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(16),
        backgroundColor: colors.background,
        gap: responsiveWidth(8),
      }}
    />
  );
});

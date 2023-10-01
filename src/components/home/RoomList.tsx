import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/Responsive';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {useEffect} from 'react';
import {observer} from 'mobx-react';

type Props = {
  role: string;
};

const RoomList = observer(({role}: Props) => {
  const {colors} = useTheme();
  const {rooms} = useStores();
  const {api} = useServices();

  useEffect(() => {
    const intervalId = setInterval(() => {
      api.rooms.getRooms(role);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <FlatList
      data={role == 'PLACE' ? rooms.getPlaces : (role == 'USER' ? rooms.getUsers : [])}
      renderItem={({item, index}) => <RoomListItem key={index} room={item}/>}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), backgroundColor: colors.background}}
    />
  );
});

export default RoomList;

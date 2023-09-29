import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  rooms?: {
    name?: string;
    username?: string;
  }[];
};

export default function RoomList({rooms}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={rooms}
      renderItem={({item, index}) => <RoomListItem key={index} room={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), backgroundColor: colors.background}}
    />
  );
}

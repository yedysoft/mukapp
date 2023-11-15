import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/Responsive';
import {observer} from 'mobx-react';
import {IRoom} from '../../types/room';
import {MukTheme} from '../../types';

type Props = {
  rooms: IRoom[];
};

const RoomList = observer(({rooms}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <FlatList
      data={rooms}
      renderItem={({item, index}) => <RoomListItem key={index} roomData={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), backgroundColor: colors.background}}
    />
  );
});

export default RoomList;

import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import RoomListItem from './RoomListItem';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {IRoom} from '../../types/room';
import {MukTheme} from '../../types';
import MukImage from '../custom/MukImage';

type Props = {
  rooms: IRoom[];
};

const RoomList = observer(({rooms}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <>
      {rooms.length > 0 ? (
        <FlatList
          data={rooms}
          renderItem={({item, index}) => <RoomListItem key={index} roomData={item} />}
          scrollEnabled
          contentContainerStyle={{
            paddingVertical: responsiveWidth(8),
            paddingHorizontal: responsiveWidth(16),
            backgroundColor: colors.background,
            gap: responsiveWidth(8),
          }}
        />
      ) : (
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      )}
    </>
  );
});

export default RoomList;

import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {IRoom} from '../../types/room';
import {useServices} from '../../services';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import MukIcon from '../custom/MukIcon';

type Props = {
  roomData: IRoom;
};

const RoomListItem = observer(({roomData}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const {room} = useStores();

  const openRoom = async () => {
    await api.room.openRoom(roomData.sessionId, roomData.streamerId);
    if (room.isLive) {
      navigation.navigate('Room');
    }
  };

  return (
    <MukListItem disabled={!roomData.isLive} style={{opacity: roomData.isLive ? 1 : 0.5}} onPress={() => openRoom()}>
      <MukImage scale={2} style={{backgroundColor: roomData.liveSong?.dominantColor, borderColor: roomData.liveSong?.dominantColor, borderWidth: responsiveWidth(2)}} source={require('../../../assets/adaptive-icon.png')} />
      <View style={{justifyContent: 'space-between', paddingTop: responsiveHeight(16), flex: 1}}>
        <View style={{gap: responsiveWidth(8)}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>
            {roomData.roomName}
          </Text>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
            @{roomData.streamerName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden', maxWidth: '100%'}}>
          <MukIcon icon={'speaker'} scale={0.6} color={colors.tertiary} iconStyle={{marginLeft: responsiveWidth(-8)}} />
          <Text numberOfLines={1} style={{color: colors.secondary, fontSize: responsiveSize(14)}}>{roomData.liveSong?.name}</Text>
        </View>
        {/*
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MukIcon icon={'bar-chart-2'} scale={0.5} />
              <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MukIcon icon={'users'} scale={0.5} />
              <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
            </View>
            <MukIconButton scale={0.3} icon={'heart'} color={colors.tertiary} />
          </View>
        */}
      </View>
    </MukListItem>
  );
});

export default RoomListItem;

import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
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

export default observer(({roomData}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const {room, auth} = useStores();

  const openRoom = async () => {
    if (room.getSessionId !== roomData.sessionId) {
      await api.room.openRoom(roomData.sessionId, roomData.streamerId);
    }
    if (room.isLive) {
      navigation.navigate('Room');
    }
  };

  return (
    <MukListItem
      disabled={!roomData.isLive}
      style={{
        opacity: roomData.isLive ? 1 : 0.5,
        backgroundColor: colors.shadow,
        paddingVertical: responsiveWidth(16),
        borderRadius: 16,
      }}
      onPress={() => openRoom()}
    >
      <MukImage
        scale={2}
        resizeMode={'cover'}
        style={{
          borderWidth: 0.5,
          backgroundColor: roomData.liveSong?.dominantColor,
          borderColor: colors.secondary,
        }}
        source={
          roomData.image
            ? {uri: `${roomData.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: responsiveSize(18), fontWeight: '500', color: colors.secondary}}>
            {roomData.roomName}
          </Text>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '200', color: colors.secondary}}>
            @{roomData.streamerName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(4),
          }}
        >
          <MukIcon
            icon={'speaker'}
            scale={0.5}
            color={roomData.liveSong?.isPlaying ? colors.tertiary : api.helper.addOpacityToColor(colors.secondary, 0.5)}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: colors.secondary,
                fontSize: responsiveSize(14),
                maxWidth: !roomData.liveSong?.name ? 180 : undefined,
                backgroundColor: !roomData.liveSong?.name ? colors.shadow : undefined,
                marginBottom: !roomData.liveSong?.name ? responsiveWidth(4) : undefined,
              }}
            >
              {roomData.liveSong?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: colors.secondary,
                fontSize: responsiveSize(14),
                maxWidth: roomData.liveSong && !api.helper.getArtist(roomData.liveSong.artists) ? 120 : undefined,
                backgroundColor:
                  roomData.liveSong && !api.helper.getArtist(roomData.liveSong.artists) ? colors.shadow : undefined,
              }}
            >
              {api.helper.getArtist(roomData.liveSong?.artists)}
            </Text>
          </View>
        </View>
      </View>
    </MukListItem>
  );
});

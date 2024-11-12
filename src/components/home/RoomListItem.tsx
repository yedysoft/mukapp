import {useTheme} from '../../hooks';
import {View} from 'react-native';
import {YedyIcon, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {useNavigation} from '@react-navigation/native';
import {IRoom} from '../../types/room';
import {useServices} from '../../services';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MainStackNavProp} from '../../navigation/MainStack';

type Props = {
  roomData: IRoom;
};

export default observer(({roomData}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const {room, auth} = useStores();

  const openRoom = async () => {
    if (room.sessionId !== roomData.sessionId) {
      await api.room.openRoom(roomData.sessionId, roomData.streamerId);
    }
    if (room.live) {
      navigation.navigate('Room');
    }
  };

  return (
    <YedyListItem
      disabled={!roomData.isLive}
      style={{
        opacity: roomData.isLive ? 1 : 0.5,
        backgroundColor: colors.shadow,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 16,
        gap: responsiveWidth(12),
      }}
      onPress={() => openRoom()}
    >
      <YedyImage
        scale={1.5}
        resizeMode={'cover'}
        style={{
          backgroundColor: roomData.liveSong?.dominantColor,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          paddingLeft: 0,
        }}
        source={
          roomData.image
            ? {uri: `${roomData.image.link}?token=${auth.authToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          paddingVertical: responsiveWidth(8),
          paddingRight: responsiveWidth(8),
        }}
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <YedyText type={'bold'} size={15}>
            {roomData.roomName}
          </YedyText>
          <YedyText numberOfLines={1} size={11}>
            @{roomData.streamerName}
          </YedyText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(4),
          }}
        >
          <YedyIcon
            icon={'speaker'}
            scale={0.4}
            color={roomData.liveSong?.isPlaying ? colors.tertiary : api.helper.addOpacityToColor(colors.secondary, 0.5)}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <YedyText
              numberOfLines={1}
              style={{
                maxWidth: !roomData.liveSong?.name ? 180 : undefined,
                backgroundColor: !roomData.liveSong?.name ? colors.shadow : undefined,
                marginBottom: !roomData.liveSong?.name ? responsiveWidth(4) : undefined,
              }}
            >
              {roomData.liveSong?.name}
            </YedyText>
            <YedyText
              numberOfLines={1}
              size={10}
              style={{
                maxWidth: !api.helper.getArtist(roomData.liveSong?.artists) ? 120 : undefined,
                backgroundColor: !api.helper.getArtist(roomData.liveSong?.artists) ? colors.shadow : undefined,
              }}
            >
              {api.helper.getArtist(roomData.liveSong?.artists)}
            </YedyText>
          </View>
        </View>
      </View>
    </YedyListItem>
  );
});

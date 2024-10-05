import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {IRoom} from '../../types/room';
import {useServices} from '../../services';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import MukIcon from '../custom/MukIcon';
import YedyText from '../custom/YedyText';

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
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 16,
        gap: responsiveWidth(12),
      }}
      onPress={() => openRoom()}
    >
      <MukImage
        scale={1.7}
        resizeMode={'cover'}
        style={{
          backgroundColor: roomData.liveSong?.dominantColor,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          paddingLeft: 0,
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
          paddingVertical: responsiveWidth(8),
          paddingRight: responsiveWidth(8),
        }}
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <YedyText fontType={'bold'} fontSize={18}>
            {roomData.roomName}
          </YedyText>
          <YedyText numberOfLines={1} fontSize={14}>
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
            <YedyText
              numberOfLines={1}
              fontSize={14}
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
              fontSize={13}
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
    </MukListItem>
  );
});

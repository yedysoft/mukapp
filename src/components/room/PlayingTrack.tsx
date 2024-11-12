import {useTheme} from '../../hooks';
import {Platform, TouchableOpacity, View} from 'react-native';
import {responsiveWidth, shadowStyle} from '../../utils/util';
import {YedyIconButton, YedyImage, YedyProgressBar, YedyText} from '../custom';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import SpotifyIcon from '../spotify/SpotifyIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  compact?: boolean;
};

export default observer(({compact}: Props) => {
  const {colors} = useTheme();
  const {media} = useStores();
  const {api} = useServices();
  const dominantColor = media.playingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;
  const iconColor = api.helper.isColorLight(dominantColor) ? 'black' : 'white';
  const navigation = useNavigation<MainStackNavProp>();
  const insets = useSafeAreaInsets();

  /*useEffect(() => {
    media.getPlaylists &&
      !media.playingTrack.uri &&
      media.getPlaylists[1] &&
      api.helper.openURL(`${spotifyOpenUrlBase}/playlist/${media.getPlaylists[1].id}`); //TODO: SPOTİDE PLAY EKLENİNCE KALDIRILACAK
  }, [media.getPlaylists]);*/

  return (
    <View
      style={{
        padding: responsiveWidth(compact ? 8 : 16),
        paddingTop: compact ? undefined : insets.top + responsiveWidth(Platform.OS === 'ios' ? 4 : 32),
        backgroundColor: dominantColor ?? colors.background,
        gap: responsiveWidth(4),
        flexDirection: 'column',
      }}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={compact ? () => navigation.navigate('Room') : undefined}
        style={{
          flexDirection: 'row',
        }}
      >
        <YedyImage
          scale={compact ? 1.4 : 2}
          style={{backgroundColor: colors.shadow}}
          source={api.helper.getImageUrl(media.playingTrack.images, compact ? 1 : 2)}
          radius={false}
        />
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <YedyText
            numberOfLines={1}
            type={'bold'}
            size={compact ? 16 : 20}
            color={textColor ?? colors.secondary}
            style={{
              backgroundColor: !media.playingTrack.name ? colors.shadow : undefined,
              maxWidth: !media.playingTrack.name ? 180 : undefined,
              marginLeft: responsiveWidth(8),
              marginBottom: !media.playingTrack.name ? responsiveWidth(4) : undefined,
            }}
          >
            {media.playingTrack.name}
          </YedyText>
          <YedyText
            numberOfLines={1}
            size={compact ? 14 : 16}
            color={textColor ?? colors.secondary}
            style={{
              backgroundColor: !api.helper.getArtist(media.playingTrack.artists) ? colors.shadow : undefined,
              maxWidth: !api.helper.getArtist(media.playingTrack.artists) ? 120 : undefined,
              marginLeft: responsiveWidth(8),
            }}
          >
            {api.helper.getArtist(media.playingTrack.artists)}
          </YedyText>
          {media.playingTrack.id && <SpotifyIcon color={iconColor} id={media.playingTrack.id} />}
        </View>
        {compact && (
          <YedyIconButton
            onPress={api.room.closeRoom}
            icon={'close-circle-outline'}
            scale={0.5}
            color={textColor ?? colors.secondary}
            style={{justifyContent: 'center'}}
          />
        )}
      </TouchableOpacity>

      {!compact && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <YedyText color={textColor ?? colors.secondary}>
            {api.helper.msToMinSec(media.playingTrack.progress)}
          </YedyText>
          <YedyText color={textColor ?? colors.secondary}>
            {api.helper.msToMinSec(media.playingTrack.duration - media.playingTrack.progress)}
          </YedyText>
        </View>
      )}
      <View style={shadowStyle()}>
        <YedyProgressBar
          color={textColor ?? colors.primary}
          progress={api.helper.getPercent(media.playingTrack.progress ?? 0, media.playingTrack.duration)}
        />
      </View>
    </View>
  );
});

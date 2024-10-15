import useTheme from '../../hooks/useTheme';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../custom/YedyProgressBar';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import YedyIconButton from '../custom/YedyIconButton';
import {useNavigation} from '@react-navigation/native';
import {MukColors} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import SpotifyIcon from '../spotify/SpotifyIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import YedyText from '../custom/YedyText';

type Props = {
  compact?: boolean;
};

export default observer(({compact}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {media} = useStores();
  const {api} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;
  const iconColor = api.helper.isColorLight(dominantColor) ? 'black' : 'white';
  const navigation = useNavigation<MainStackNavProp>();
  const insets = useSafeAreaInsets();

  /*useEffect(() => {
    media.getPlaylists &&
      !media.getPlayingTrack.uri &&
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
        <MukImage
          scale={compact ? 1.4 : 2}
          style={{backgroundColor: colors.shadow}}
          source={api.helper.getImageUrl(media.getPlayingTrack.images, compact ? 1 : 2)}
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
            fontType={'bold'}
            fontSize={compact ? 16 : 20}
            style={{
              color: textColor ?? colors.secondary,
              backgroundColor: !media.getPlayingTrack.name ? colors.shadow : undefined,
              maxWidth: !media.getPlayingTrack.name ? 180 : undefined,
              marginLeft: responsiveWidth(8),
              marginBottom: !media.getPlayingTrack.name ? responsiveWidth(4) : undefined,
            }}
          >
            {media.getPlayingTrack.name}
          </YedyText>
          <YedyText
            numberOfLines={1}
            fontSize={compact ? 14 : 16}
            style={{
              color: textColor ?? colors.secondary,
              backgroundColor: !api.helper.getArtist(media.getPlayingTrack.artists) ? colors.shadow : undefined,
              maxWidth: !api.helper.getArtist(media.getPlayingTrack.artists) ? 120 : undefined,
              marginLeft: responsiveWidth(8),
            }}
          >
            {api.helper.getArtist(media.getPlayingTrack.artists)}
          </YedyText>
          {media.getPlayingTrack.id && <SpotifyIcon color={iconColor} id={media.getPlayingTrack.id} />}
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
          <YedyText style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.progress)}
          </YedyText>
          <YedyText style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.duration - media.getPlayingTrack.progress)}
          </YedyText>
        </View>
      )}
      <View style={[styles.shadow]}>
        <MukProgressBar
          color={textColor ?? colors.primary}
          progress={api.helper.getPercent(media.getPlayingTrack.progress ?? 0, media.getPlayingTrack.duration)}
        />
      </View>
    </View>
  );
});

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.secondary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
  });

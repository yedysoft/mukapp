import {Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../../components/custom/MukProgressBar';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import MukIconButton from '../custom/MukIconButton';
import {useNavigation} from '@react-navigation/native';
import {MukColors, MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import SpotifyIcon from '../spotify/SpotifyIcon';

type Props = {
  compact?: boolean;
};

export default observer(({compact}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const {media} = useStores();
  const {api} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;
  const iconColor = api.helper.isColorLight(dominantColor) ? 'black' : 'white';
  const navigation = useNavigation<MainStackNavProp>();

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
        paddingTop: compact ? undefined : 48,
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
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(compact ? 18 : 20),
              fontWeight: '500',
              color: textColor ?? colors.secondary,
              backgroundColor: !media.getPlayingTrack.name ? colors.shadow : undefined,
              maxWidth: !media.getPlayingTrack.name ? 180 : undefined,
              marginLeft: responsiveWidth(8),
              marginBottom: !media.getPlayingTrack.name ? responsiveWidth(4) : undefined,
            }}
          >
            {media.getPlayingTrack.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(compact ? 14 : 16),
              fontWeight: '300',
              color: textColor ?? colors.secondary,
              backgroundColor: !api.helper.getArtist(media.getPlayingTrack.artists) ? colors.shadow : undefined,
              maxWidth: !api.helper.getArtist(media.getPlayingTrack.artists) ? 120 : undefined,
              marginLeft: responsiveWidth(8),
            }}
          >
            {api.helper.getArtist(media.getPlayingTrack.artists)}
          </Text>
          {media.getPlayingTrack.id && (
            <SpotifyIcon
              color={iconColor}
              onPress={() =>
                media.getPlayingTrack.id && api.helper.openURL(`spotify:track:${media.getPlayingTrack.id}`)
              }
            />
          )}
        </View>
        {compact && (
          <MukIconButton
            onPress={api.room.closeRoom}
            icon={'x-circle'}
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
          <Text style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.progress)}
          </Text>
          <Text style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.duration - media.getPlayingTrack.progress)}
          </Text>
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
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 5,
    },
  });

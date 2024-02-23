import {Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../../components/custom/MukProgressBar';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import MukIconButton from '../custom/MukIconButton';
import {useNavigation} from '@react-navigation/native';
import {MukColors, MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';

type Props = {
  compact?: boolean;
};

const PlayingTrack = observer(({compact}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const {media, ui} = useStores();
  const {api} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.background : colors.secondary;
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <View
      style={{
        width: ui.windowWidth,
        height: responsiveWidth(compact ? 100 : 300),
        justifyContent: compact ? 'flex-start' : 'flex-end',
        padding: responsiveWidth(compact ? 8 : 16),
        position: compact ? 'absolute' : 'relative',
        bottom: 0,
        backgroundColor: dominantColor ?? colors.background,
        gap: responsiveWidth(4),
      }}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={() => navigation.navigate('Room')}
        style={{
          flexDirection: 'row',
          gap: responsiveWidth(16),
          marginBottom: responsiveHeight(compact ? 8 : 0),
        }}
      >
        <MukImage
          scale={compact ? 1 : 2}
          style={{backgroundColor: colors.shadow}}
          source={api.helper.getImageUrl(media.getPlayingTrack.images, compact ? 1 : 2)}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: responsiveWidth(2),
            paddingBottom: responsiveWidth(compact ? 12 : 8),
            maxWidth: responsiveWidth(compact ? 264 : 236),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(compact ? 18 : 20),
              fontWeight: '500',
              color: textColor ?? colors.secondary,
              backgroundColor: !media.getPlayingTrack.name ? colors.shadow : undefined,
              minWidth: !media.getPlayingTrack.name ? 180 : undefined,
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
              backgroundColor: !media.getPlayingTrack.artists ? colors.shadow : undefined,
              maxWidth: !media.getPlayingTrack.artists ? 120 : undefined,
            }}
          >
            {api.helper.getArtist(media.getPlayingTrack.artists)}
          </Text>
        </View>
        {compact && (
          <MukIconButton
            onPress={api.room.closeRoom}
            icon={'x-circle'}
            scale={0.5}
            color={textColor ?? colors.secondary}
            style={{position: 'absolute', right: 0, top: responsiveWidth(8)}}
          />
        )}
      </TouchableOpacity>
      {!compact && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.progress)}
          </Text>
          <Text style={{color: textColor ?? colors.secondary}}>
            {api.helper.msToMinSec(media.getPlayingTrack.duration)}
          </Text>
        </View>
      )}
      <View style={styles.shadow}>
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

export default PlayingTrack;

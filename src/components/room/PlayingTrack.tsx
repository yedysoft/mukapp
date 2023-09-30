import {MD3Theme, Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth, screenWidth} from '../../utils/Responsive';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../../components/custom/MukProgressBar';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {
  compact?: boolean;
};

const PlayingTrack = observer(({compact}: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {media} = useStores();
  const {api} = useServices();

  return (
    <LinearGradient
      colors={[theme.colors.background, 'transparent', ...api.helper.getSafeArray(media.getPlayingTrack.palette)]}
      style={{
        width: screenWidth,
        height: responsiveHeight(compact ? 88 : 280),
        justifyContent: 'flex-end',
        padding: responsiveWidth(compact ? 8 : 16),
        position: compact ? 'absolute' : 'relative',
        bottom: 0,
      }}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={() => console.log('Odaya Dön')}
        style={{flexDirection: 'row', gap: responsiveWidth(16), marginBottom: responsiveHeight(compact ? 8 : 16)}}
      >
        <MukImage scale={compact ? 1 : 2} source={{uri: `${api.helper.getImageUrl(media.getPlayingTrack.images)}`}} />
        <View
          style={{flexDirection: 'column', justifyContent: 'flex-end', gap: responsiveWidth(4), paddingBottom: responsiveWidth(compact ? 8 : 16)}}
        >
          <Text style={{fontSize: responsiveSize(compact ? 16 : 20), fontWeight: '500'}}>{media.getPlayingTrack.name}</Text>
          <Text style={{fontSize: responsiveSize(compact ? 12 : 16), fontWeight: '300'}}>{api.helper.getArtist(media.getPlayingTrack.artists)}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.shadow}>
        <MukProgressBar progress={api.helper.getPercent(media.getPlayingTrack.progress ?? 0, media.getPlayingTrack.duration)} />
      </View>
    </LinearGradient>
  );
});

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.primary,
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

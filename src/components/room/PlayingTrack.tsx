import {MD3Theme, Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth, screenWidth} from '../../utils/Responsive';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../../components/custom/MukProgressBar';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import MukIconButton from '../custom/MukIconButton';
import {useNavigation} from '@react-navigation/native';

type Props = {
  compact?: boolean;
};

const PlayingTrack = observer(({compact}: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {media} = useStores();
  const {api} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? theme.colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? theme.colors.background : theme.colors.secondary;
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: screenWidth,
        height: responsiveHeight(compact ? 88 : 300),
        justifyContent: 'flex-end',
        padding: responsiveWidth(compact ? 8 : 16),
        position: compact ? 'absolute' : 'relative',
        bottom: 0,
        backgroundColor: dominantColor ?? theme.colors.background,
      }}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={() => navigation.navigate('Room')}
        style={{flexDirection: 'row', gap: responsiveWidth(16), marginBottom: responsiveHeight(compact ? 8 : 16)}}
      >
        <MukImage
          scale={compact ? 1 : 2}
          source={api.helper.getImageUrl(media.getPlayingTrack.images, compact ? 1 : 2)}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: responsiveWidth(4),
            paddingBottom: responsiveWidth(compact ? 8 : 16),
            maxWidth: responsiveWidth(compact ? 264 : 236),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(compact ? 18 : 20),
              fontWeight: '500',
              color: textColor ?? theme.colors.secondary,
            }}
          >
            {media.getPlayingTrack.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(compact ? 14 : 16),
              fontWeight: '300',
              color: textColor ?? theme.colors.secondary,
            }}
          >
            {api.helper.getArtist(media.getPlayingTrack.artists)}
          </Text>
        </View>
        {compact && (
          <MukIconButton
            onPress={api.room.closeRoom}
            icon={'window-close'}
            scale={0.5}
            color={textColor ?? theme.colors.secondary}
            style={{position: 'absolute', right: 0, top: responsiveWidth(8)}}
          />
        )}
      </TouchableOpacity>
      <View style={styles.shadow}>
        <MukProgressBar
          color={textColor ?? theme.colors.primary}
          progress={api.helper.getPercent(media.getPlayingTrack.progress ?? 0, media.getPlayingTrack.duration)}
        />
      </View>
    </View>
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

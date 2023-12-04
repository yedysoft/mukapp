import {Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth, screenWidth} from '../../utils/util';
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
  const {media} = useStores();
  const {api} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.background : colors.secondary;
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <View
      style={{
        width: screenWidth,
        height: responsiveHeight(compact ? 88 : 300),
        justifyContent: 'flex-end',
        padding: responsiveWidth(compact ? 8 : 16),
        position: compact ? 'absolute' : 'relative',
        bottom: 0,
        backgroundColor: dominantColor ?? colors.background,
      }}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={() => navigation.navigate('Room')}
        style={{
          flexDirection: 'row',
          gap: responsiveWidth(16),
          marginBottom: responsiveHeight(compact ? 8 : 16),
        }}
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
              color: textColor ?? colors.secondary,
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
            color={textColor ?? colors.secondary}
            style={{position: 'absolute', right: 0, top: responsiveWidth(8)}}
          />
        )}
      </TouchableOpacity>
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
      shadowColor: colors.primary,
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

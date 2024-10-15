import useTheme from '../../hooks/useTheme';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';
import {MukColors} from '../../types';
import SpotifyIcon from '../spotify/SpotifyIcon';
import YedyText from '../custom/YedyText';

type Props = {
  onPress?: () => void;
  active?: boolean;
  playlist: IPlaylist;
};

export default function PlaylistListItem({onPress, active, playlist}: Props) {
  const {colors} = useTheme();
  const styles = makeStyles(colors, active);
  const {api} = useServices();
  const isSearch = playlist.id === 'search';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'column',
          backgroundColor: colors.background,
          height: responsiveWidth(164),
          borderRadius: 12,
          justifyContent: 'space-between',
          paddingVertical: responsiveWidth(8),
          paddingRight: responsiveWidth(8),
          paddingLeft: responsiveWidth(isSearch ? 8 : 0),
        },
        styles.shadow,
      ]}
    >
      {isSearch ? (
        <SpotifyIcon color={'green'} scale={2.5} /> /*<YedyIcon icon={playlist.images[0].url as string} scale={1.8}/>*/
      ) : (
        <MukImage
          radius={false}
          scale={1.8}
          source={api.helper.getImageUrl(playlist.images, 1.8)}
          style={{marginLeft: responsiveWidth(8)}}
        />
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {!isSearch && <SpotifyIcon />}
        <YedyText numberOfLines={1} fontSize={14} style={{maxWidth: responsiveWidth(120)}}>
          {playlist.name}
        </YedyText>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (colors: MukColors, active: boolean | undefined) =>
  StyleSheet.create({
    shadow: {
      shadowColor: active ? colors.primary : 'rgb(138,138,138)',
      shadowOffset: {
        width: 0,
        height: active ? 4 : 3,
      },
      shadowOpacity: active ? 0.4 : 0.2,
      shadowRadius: 3,
      elevation: 8,
    },
  });

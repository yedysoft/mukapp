import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';
import {MukColors, MukTheme} from '../../types';
import MukIcon from '../custom/MukIcon';

type Props = {
  onPress?: () => void;
  active?: boolean;
  playlist: IPlaylist;
};

export default function PlaylistListItem({onPress, active, playlist}: Props) {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors, active);
  const {api} = useServices();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'column',
          backgroundColor: colors.background,
          height: responsiveWidth(160),
          borderRadius: 16,
          justifyContent: 'space-between',
          padding: responsiveWidth(8),
        },
        styles.shadow,
      ]}
    >
      {playlist.id === 'search' ? (
        <MukIcon icon={playlist.images[0].url} scale={1.8} />
      ) : (
        <MukImage scale={1.8} source={api.helper.getImageUrl(playlist.images, 1.8)} />
      )}
      <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
        {playlist.name}
      </Text>
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

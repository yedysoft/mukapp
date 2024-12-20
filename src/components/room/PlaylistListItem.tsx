import {useTheme} from '../../hooks';
import {YedyImage, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {TouchableOpacity, View} from 'react-native';
import {IPlaylist} from '../../types/media';
import {useServices} from '../../services';

type Props = {
  onPress?: () => void;
  active?: boolean;
  playlist: IPlaylist;
};

export default function PlaylistListItem({onPress, active, playlist}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();
  const isSearch = playlist.id === 'search';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'column',
        backgroundColor: colors.background,
        height: responsiveWidth(164),
        borderRadius: 12,
        justifyContent: 'space-between',
        paddingVertical: responsiveWidth(8),
        paddingRight: responsiveWidth(8),
        paddingLeft: responsiveWidth(isSearch ? 8 : 0),
      }}
    >
      <YedyImage
        radius={false}
        scale={1.8}
        source={api.helper.getImageUrl(playlist.images, 1.8)}
        style={{marginLeft: responsiveWidth(8)}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <YedyText numberOfLines={1} size={14} style={{maxWidth: responsiveWidth(120)}}>
          {playlist.name}
        </YedyText>
      </View>
    </TouchableOpacity>
  );
}

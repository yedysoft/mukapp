import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {IQueueTrack, ITrack} from '../../types/media';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  song: IQueueTrack | ITrack;
};

const SongListItem = observer(({song}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();

  return (
    <MukListItem style={{alignItems: 'center'}} disabled={true}>
      <MukImage scale={1.3} source={api.helper.getImageUrl(song.images, 1.3)} />
      <View style={{justifyContent: 'center', gap: responsiveWidth(8), maxWidth: responsiveWidth(240)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>
          {song.name}
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
          {api.helper.getArtist(song.artists)}
        </Text>
      </View>
      <MukIconButton
        badge={'voteCount' in song ? song.voteCount : undefined}
        style={{position: 'absolute', right: responsiveWidth(16)}}
        scale={0.4}
        icon={'cards-heart-outline'}
        color={'rgba(255, 55, 95, 1)'}
        onPress={() => api.subscription.voteMusic({musicId: song.id, userId: user.getInfo.id})}
      />
    </MukListItem>
  );
});

export default SongListItem;

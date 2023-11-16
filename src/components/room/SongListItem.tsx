import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import {useServices} from '../../services';
import {IQueueTrack, ITrack} from '../../types/media';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import VoteButton from './VoteButton';
import AddButton from './AddButton';
import {MukTheme} from '../../types';

type Props = {
  song: IQueueTrack | ITrack;
  itemType: 'add' | 'vote';
};

const SongListItem = observer(({song, itemType}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user, media, ui} = useStores();

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
      {itemType === 'vote' ? (
        <VoteButton
          isLoading={!media.getPlayingTrack.voteable}
          badge={'voteCount' in song ? song.voteCount : undefined}
          style={{position: 'absolute', right: responsiveWidth(16)}}
          onPress={() =>
            media.getPlayingTrack.voteable
              ? api.subscription.voteMusic({musicUri: song.uri, userId: user.getInfo.id})
              : ui.addMessage({
                  code: 1021,
                  message: 'Oylamak için sıradaki şarkının çalmasını bekle',
                })
          }
        />
      ) : itemType === 'add' ? (
        <AddButton onPress={() => console.log('AddSong')} style={{position: 'absolute', right: responsiveWidth(0)}} />
      ) : null}
    </MukListItem>
  );
});

export default SongListItem;

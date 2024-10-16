import {useTheme} from '../../hooks';
import {View} from 'react-native';
import {YedyIconButton, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {useServices} from '../../services';
import {IQueueTrack, ITrack} from '../../types/media';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import VoteButton from './VoteButton';
import {useState} from 'react';
import SpotifyIcon from '../spotify/SpotifyIcon';

type Props = {
  song: IQueueTrack | ITrack;
  itemType: 'add' | 'vote';
  disabled?: boolean;
};

export default observer(({song, itemType, disabled}: Props) => {
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {user, media, ui} = useStores();

  const [title, setTitle] = useState<string>();
  const soonTitle = () => {
    setTitle(t.do('error.soon'));
    const myInterval = setInterval(() => {
      setTitle(undefined);
      clearInterval(myInterval);
    }, 2000);
  };

  return (
    <YedyListItem style={{flex: 1, gap: responsiveWidth(8)}} disabled={true}>
      <YedyImage scale={1.4} source={api.helper.getImageUrl(song.images, 1.4)} radius={false} />
      {title ? (
        <YedyText numberOfLines={1} size={18} color={colors.tertiary}>
          {title}
        </YedyText>
      ) : (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <YedyText numberOfLines={1} type={'bold'} size={18} style={{marginLeft: responsiveWidth(8)}}>
            {song.name}
          </YedyText>
          <YedyText numberOfLines={1} size={14} style={{marginLeft: responsiveWidth(8)}}>
            {api.helper.getArtist(song.artists)}
          </YedyText>
          <SpotifyIcon id={song.id} />
        </View>
      )}
      {itemType === 'vote' ? (
        <VoteButton
          disabled={disabled}
          isLoading={!media.getVoteable}
          badge={'voteCount' in song ? song.voteCount : undefined}
          style={{justifyContent: 'center'}}
          onPress={() => {
            media.getVoteable
              ? api.subscription.voteMusic({musicUri: song.uri, userId: user.getInfo.id})
              : ui.addError('Oylamak için sıradaki şarkının çalmasını bekle', 1021);
          }}
        />
      ) : itemType === 'add' ? (
        <YedyIconButton
          icon={'plus'}
          onPress={soonTitle}
          color={title ? colors.tertiary : colors.secondary}
          style={{position: 'absolute', right: responsiveWidth(0)}}
        />
      ) : null}
    </YedyListItem>
  );
});

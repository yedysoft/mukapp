import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {useServices} from '../../services';
import {IQueueTrack, ITrack} from '../../types/media';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import VoteButton from './VoteButton';
import AddButton from './AddButton';
import {MukTheme} from '../../types';
import {useState} from 'react';
import {spotifyOpenUrlBase} from '../../../config';
import SpotifyIcon from '../spotify/SpotifyIcon';

type Props = {
  song: IQueueTrack | ITrack;
  itemType: 'add' | 'vote';
  disabled?: boolean;
};

export default observer(({song, itemType, disabled}: Props) => {
  const {colors} = useTheme<MukTheme>();
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
    <MukListItem style={{alignItems: 'center', gap: 0}} disabled={disabled}>
      <MukImage scale={1.3} source={api.helper.getImageUrl(song.images, 1.3)} radius={false} />
      <View style={{gap: responsiveWidth(4), maxWidth: responsiveWidth(240)}}>
        {title ? (
          <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400', color: colors.tertiary}}>
            {title}
          </Text>
        ) : (
          <>
            <Text
              numberOfLines={1}
              style={{
                fontSize: responsiveSize(18),
                fontWeight: '500',
                color: colors.secondary,
                marginLeft: responsiveWidth(8),
              }}
            >
              {song.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: responsiveSize(14),
                fontWeight: '300',
                color: colors.secondary,
                marginLeft: responsiveWidth(8),
              }}
            >
              {api.helper.getArtist(song.artists)}
            </Text>
            <SpotifyIcon onPress={() => api.helper.openURL(`${spotifyOpenUrlBase}/track/${song.id}`)} />
          </>
        )}
      </View>
      {itemType === 'vote' ? (
        <VoteButton
          disabled={disabled}
          isLoading={!media.getPlayingTrack.voteable}
          badge={'voteCount' in song ? song.voteCount : undefined}
          style={{position: 'absolute', right: responsiveWidth(16)}}
          onPress={event => {
            event.stopPropagation();
            media.getPlayingTrack.voteable
              ? api.subscription.voteMusic({musicUri: song.uri, userId: user.getInfo.id})
              : ui.addError('Oylamak için sıradaki şarkının çalmasını bekle', 1021);
          }}
        />
      ) : itemType === 'add' ? (
        <AddButton
          onPress={soonTitle}
          color={title ? colors.tertiary : colors.secondary}
          style={{position: 'absolute', right: responsiveWidth(0)}}
        />
      ) : null}
    </MukListItem>
  );
});

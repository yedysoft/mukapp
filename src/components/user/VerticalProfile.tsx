import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {IInfo} from '../../types/user';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import SpotifyIcon from '../spotify/SpotifyIcon';
import YedyText from '../custom/YedyText';

type Props = {
  profile: IInfo;
  otherUser?: boolean;
};

const connectedAccounts: Record<string, string> = {SPOTIFY: 'Spotify'};

export default observer(({profile, otherUser}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation();
  const {api} = useServices();
  const {user, auth} = useStores();

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: responsiveWidth(16),
        padding: responsiveWidth(8),
      }}
    >
      <MukImage
        scale={2}
        source={
          profile.image
            ? {uri: `${profile.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{
          borderWidth: responsiveSize(4),
          borderRadius: 100,
          aspectRatio: 1,
          borderColor: colors.primary,
          backgroundColor: 'transparent',
        }}
      />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <YedyText fontType={'bold'} fontSize={24}>
          {profile.name}
        </YedyText>
        <YedyText fontSize={16}>@{profile.userName}</YedyText>
        <View style={{flexDirection: 'row', marginLeft: -8, gap: responsiveWidth(4)}}>
          {Object.entries(connectedAccounts).map(([key, _name]) => {
            const a = auth.auths.find(value => value.type === key);
            return a ? <SpotifyIcon key={key} id={a.accountId} type={'user'} noText /> : undefined;
          })}
        </View>
        <View style={{flexDirection: 'row', gap: responsiveWidth(4), display: otherUser ? undefined : 'none'}}>
          <MukIconButton
            color={colors.secondary}
            scale={0.4}
            icon={profile.isFollows ? 'user-minus' : 'user-plus'}
            onPress={() => {
              profile.isFollows ? api.user.unFollow(profile.id) : api.user.sendFollowRequest(profile.id);
              navigation.goBack();
            }}
          />
          <MukIconButton
            scale={0.4}
            icon={'slash'}
            color={colors.tertiary}
            onPress={() => {
              api.user.blockUser(profile.id);
              user.set('searched', []);
              navigation.goBack();
            }}
            style={{marginLeft: responsiveWidth(-8)}}
          />
        </View>
      </View>
    </View>
  );
});

import {View} from 'react-native';
import {YedyIconButton, YedyImage, YedyText} from '../custom';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {IInfo} from '../../types/user';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  profile: IInfo;
  otherUser?: boolean;
};

export default observer(({profile, otherUser}: Props) => {
  const {colors} = useTheme();
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
      <YedyImage
        scale={1.9}
        source={
          profile.image
            ? {uri: `${profile.image.link}?token=${auth.authToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        style={{
          borderWidth: 2,
          borderRadius: 100,
          aspectRatio: 1,
          borderColor: colors.outlineVariant,
        }}
      />
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
          <YedyText type={'bold'} size={21}>
            {profile.name}
          </YedyText>
          <YedyText size={13}>@{profile.userName}</YedyText>
        </View>
        <View style={{flexDirection: 'row', gap: responsiveWidth(4), display: otherUser ? undefined : 'none'}}>
          <YedyIconButton
            icon={profile.isFollows ? 'account-minus' : 'account-plus'}
            scale={0.4}
            onPress={() => {
              profile.isFollows ? api.user.unFollow(profile.id) : api.user.sendFollowRequest(profile.id);
              navigation.goBack();
            }}
          />
          <YedyIconButton
            icon={'block-helper'}
            scale={0.35}
            color={colors.tertiary}
            onPress={() => {
              api.user.blockUser(profile.id);
              user.set('searched', []);
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
});

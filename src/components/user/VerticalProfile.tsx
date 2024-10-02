import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {IInfo} from '../../types/user';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  profile: IInfo;
  otherUser?: boolean;
};

export default observer(({profile, otherUser}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation();
  const {api} = useServices();
  const {user, auth} = useStores();

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: responsiveWidth(16),
        paddingBottom: responsiveWidth(8),
      }}
    >
      <MukImage
        scale={2.4}
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
      <View style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(8)}}>
        <Text
          style={{
            fontSize: responsiveSize(24),
            fontWeight: '500',
            color: colors.secondary,
          }}
        >
          {profile.name} {profile.surname}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4)}}>
          <Text
            style={{
              fontSize: responsiveSize(16),
              fontWeight: '300',
              color: colors.secondary,
            }}
          >
            @{profile.userName}
          </Text>
          <View style={{flexDirection: 'row', display: otherUser ? undefined : 'none'}}>
            <MukIconButton
              color={colors.secondary}
              scale={0.4}
              icon={profile.isFollows ? 'user-minus' : 'user-plus'}
              onPress={() =>
                profile.isFollows ? api.user.unFollow(profile.id) : api.user.sendFollowRequest(profile.id)
              }
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
    </View>
  );
});

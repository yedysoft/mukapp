import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {IInfo} from '../../types/user';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {useState} from 'react';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../../stores';

type Props = {
  profile: IInfo;
  otherUser?: boolean;
};

export default function VerticalProfile({profile, otherUser}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation();
  const {api} = useServices();
  const {user} = useStores();
  const [followIcon, setFollowIcon] = useState<string>(
    api.helper.isUserFollows(profile.id) ? 'user-minus' : 'user-plus',
  );

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(16)}}>
      <MukImage
        scale={2.4}
        source={{uri: profile.image}}
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
            fontWeight: 'bold',
          }}
        >
          {profile.name} {profile.surname}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4)}}>
          <Text
            style={{
              fontSize: responsiveSize(16),
              fontWeight: '500',
              color: colors.primary,
            }}
          >
            @{profile.userName}
          </Text>
          <View style={{flexDirection: 'row', display: otherUser ? undefined : 'none'}}>
            <MukIconButton
              color={colors.secondary}
              scale={0.4}
              icon={followIcon}
              onPress={() => {
                api.helper.isUserFollows(profile.id)
                  ? api.user.unFollow(profile.id)
                  : api.user.sendFollowRequest(profile.id);
                setFollowIcon('user-check');
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
    </View>
  );
}

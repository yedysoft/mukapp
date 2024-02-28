import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {View} from 'react-native';
import {useServices} from '../../services';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';

type Props = {
  user: ISearchUser;
};

export default function SearchListItem({user}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <MukListItem
      style={{backgroundColor: colors.backdrop, borderRadius: 16, alignItems: 'center'}}
      onPress={() => navigation.navigate('Profile', {userId: user.id})}
    >
      <MukIcon scale={0.8} icon={user.image ?? 'user'} />
      <View style={{flexDirection: 'column', width: '66%', gap: responsiveWidth(4)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(16), color: colors.secondary, fontWeight: '500'}}>
          {user.name} {user.surname}
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), color: colors.outline, fontWeight: '300'}}>
          @{user.userName}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            display: user.isFollower ? undefined : 'none',
            fontSize: responsiveSize(12),
            marginTop: responsiveWidth(4),
            color: colors.outline,
          }}
        >
          {t.do('main.search.follows')}
        </Text>
      </View>
      {/*
        <MukIconButton
          color={colors.secondary}
          scale={0.4}
          icon={user.isFollows ? 'user-minus' : 'user-plus'}
          onPress={() => (user.isFollows ? api.user.unFollow(user.id) : api.user.sendFollowRequest(user.id))}
        />
      */}
    </MukListItem>
  );
}

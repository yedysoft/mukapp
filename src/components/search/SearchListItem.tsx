import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {YedyIcon, YedyImage, YedyListItem, YedyText} from '../custom';
import {View} from 'react-native';
import {useServices} from '../../services';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  user: ISearchUser;
};

export default observer(({user}: Props) => {
  const {colors} = useTheme();
  const {auth} = useStores();
  const {t} = useServices();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <YedyListItem
      style={{
        backgroundColor: colors.backdrop,
        paddingHorizontal: responsiveWidth(8),
        gap: responsiveWidth(8),
        borderRadius: 16,
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Profile', {userId: user.id})}
    >
      {user.image ? (
        <YedyImage scale={0.7} source={{uri: `${user.image.link}?token=${auth.getAuthToken}`}} />
      ) : (
        <YedyIcon scale={0.7} icon={'account'} />
      )}
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <YedyText numberOfLines={1} type={'bold'} size={13}>
            {user.name}
          </YedyText>
          <YedyText numberOfLines={1} size={11}>
            @{user.userName}
          </YedyText>
        </View>
        <YedyText numberOfLines={1} visible={user.isFollower} size={10} color={colors.outlineVariant}>
          {t.do('main.search.follows')}
        </YedyText>
      </View>
      {/*
        <YedyIconButton
          color={colors.secondary}
          scale={0.4}
          icon={user.isFollows ? 'account-minus' : 'account-plus'}
          onPress={() => (user.isFollows ? api.user.unFollow(user.id) : api.user.sendFollowRequest(user.id))}
        />
      */}
    </YedyListItem>
  );
});

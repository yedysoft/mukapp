import useTheme from '../../hooks/useTheme';
import {responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import YedyIcon from '../custom/YedyIcon';
import {View} from 'react-native';
import {useServices} from '../../services';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import MukImage from '../custom/MukImage';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import YedyText from '../custom/YedyText';

type Props = {
  user: ISearchUser;
};

export default observer(({user}: Props) => {
  const {colors} = useTheme();
  const {auth} = useStores();
  const {t} = useServices();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <MukListItem
      style={{backgroundColor: colors.backdrop, borderRadius: 16, alignItems: 'center'}}
      onPress={() => navigation.navigate('Profile', {userId: user.id})}
    >
      {user.image ? (
        <MukImage
          scale={0.8}
          style={{marginLeft: responsiveWidth(-5)}}
          source={{uri: `${user.image.link}?token=${auth.getAuthToken}`}}
        />
      ) : (
        <YedyIcon scale={0.8} icon={'account'} />
      )}
      <View style={{flex: 1, flexDirection: 'column'}}>
        <YedyText numberOfLines={1} fontType={'bold'} fontSize={16}>
          {user.name}
        </YedyText>
        <YedyText numberOfLines={1} fontSize={14}>
          @{user.userName}
        </YedyText>
        <YedyText
          numberOfLines={1}
          visible={user.isFollower}
          fontSize={12}
          style={{marginTop: responsiveWidth(4), color: colors.outlineVariant}}
        >
          {t.do('main.search.follows')}
        </YedyText>
      </View>
      {/*
        <YedyIconButton
          color={colors.secondary}
          scale={0.4}
          icon={user.isFollows ? 'user-minus' : 'user-plus'}
          onPress={() => (user.isFollows ? api.user.unFollow(user.id) : api.user.sendFollowRequest(user.id))}
        />
      */}
    </MukListItem>
  );
});

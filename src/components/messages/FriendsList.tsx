import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {useNavigation} from '@react-navigation/native';
import FriendsListItem from './FriendsListItem';
import {IFollowUser} from '../../types/user';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';

type Props = {
  friends?: IFollowUser[];
  onPress?: (id: string) => void;
};

export default function FriendsList({friends, onPress}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <FlatList
      data={friends}
      renderItem={({item, index}) => <FriendsListItem key={index} friend={item} onPress={onPress} />}
      scrollEnabled
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        backgroundColor: colors.background,
        gap: responsiveWidth(8),
      }}
    />
  );
}

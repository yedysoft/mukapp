import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import FriendsListItem from './FriendsListItem';
import {IFollowUser} from '../../types/user';
import {YedyImage} from '../custom';

type Props = {
  friends: IFollowUser[];
  onPress?: (id: string) => void;
};

export default function FriendsList({friends, onPress}: Props) {
  return (
    <FlatList
      data={friends}
      renderItem={({item, index}) => <FriendsListItem key={index} friend={item} onPress={onPress} />}
      scrollEnabled
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        gap: responsiveWidth(8),
      }}
      ListEmptyComponent={
        <YedyImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      }
    />
  );
}

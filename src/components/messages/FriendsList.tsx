import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {useNavigation} from '@react-navigation/native';
import FriendsListItem from './FriendsListItem';

type Props = {
  friends?: {
    username?: string;
    image?: string;
  }[];
};

export default function FriendsList({friends}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      data={friends}
      renderItem={({item, index}) => <FriendsListItem key={index} friend={item} onPress={() => navigation.navigate('Chat')}/>}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), backgroundColor: colors.background}}
    />
  );
}
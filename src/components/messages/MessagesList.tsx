import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import MessagesListItem from './MessagesListItem';
import {useNavigation} from '@react-navigation/native';

type Props = {
  chats?: {
    username?: string;
    date?: string;
    message?: string;
  }[];
};

export default function MessagesList({chats}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      data={chats}
      renderItem={({item, index}) => <MessagesListItem key={index} chats={item} onPress={() => navigation.navigate('Chat')} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

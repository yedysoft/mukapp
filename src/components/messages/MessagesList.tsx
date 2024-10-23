import {useTheme} from '../../hooks';
import {IChat} from '../../types/chat';
import {FlatList} from 'react-native';
import MessagesListItem from './MessagesListItem';
import {responsiveWidth} from '../../utils/util';
import {YedyEmptyList} from '../custom';

type Props = {
  chats: IChat[];
};

export default function MessagesList({chats}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={chats}
      renderItem={({item, index}) => <MessagesListItem key={index} chat={item} />}
      scrollEnabled
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        backgroundColor: colors.background,
      }}
      ListEmptyComponent={<YedyEmptyList />}
    />
  );
}

import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import MessagesListItem from './MessagesListItem';
import {MukTheme} from '../../types';
import {IChat} from '../../types/chat';

type Props = {
  chats: IChat[];
};

export default function MessagesList({chats}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <FlatList
      data={chats}
      renderItem={({item, index}) => <MessagesListItem key={index} chat={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), backgroundColor: colors.background}}
    />
  );
}

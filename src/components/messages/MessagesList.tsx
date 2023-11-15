import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import MessagesListItem from './MessagesListItem';
import {IChat} from '../../types/user';
import {MukTheme} from '../../types';

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

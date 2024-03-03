import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import ChatBubble from './ChatBubble';
import {IMessage} from '../../types/chat';

type Props = {
  data: IMessage[];
};

export default function ChatList({data}: Props) {
  return (
    <FlatList
      scrollEnabled
      snapToEnd
      contentContainerStyle={{
        gap: responsiveWidth(8),
        padding: responsiveWidth(8),
      }}
      data={data}
      renderItem={({item, index}) => <ChatBubble key={index} message={item} />}
      inverted
      showsVerticalScrollIndicator={false}
    />
  );
}

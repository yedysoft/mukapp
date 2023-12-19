import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import ChatBubble from './ChatBubble';
import {IMessage} from '../../types/chat';

type Props = {
  data: IMessage[];
};

export default function ChatList({data}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <FlatList
      scrollEnabled
      snapToEnd
      contentContainerStyle={{
        gap: responsiveWidth(8),
        padding: responsiveWidth(8),
      }}
      data={data}
      renderItem={({item}) => {
        return <ChatBubble message={item} />;
      }}
      inverted
      showsVerticalScrollIndicator={false}
    />
  );
}

import {useTheme} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import ChatBubble from './ChatBubble';

type Props = {
  data: any[];
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
      renderItem={() => {
        return (
          <View style={{gap: responsiveWidth(8)}}>
            <ChatBubble me={true} />
            <ChatBubble me={false} />
          </View>
        );
      }}
      inverted
      showsVerticalScrollIndicator={false}
    />
  );
}

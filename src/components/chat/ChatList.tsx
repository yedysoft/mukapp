import {FlatList, ListRenderItemInfo} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import ChatBubble from './ChatBubble';
import {IMessage} from '../../types/chat';
import React, {useCallback, useRef} from 'react';
import {useServices} from '../../services';
import ChatBubbleHeader from './ChatBubbleHeader';

type Props = {
  data: IMessage[];
};

export default function ChatList({data}: Props) {
  const {api} = useServices();
  const tempDate = useRef<string>();

  const handleRenderItem = useCallback(
    ({item, index}: ListRenderItemInfo<IMessage>) => {
      const date = api.helper.formatDateTime(item.date.toString(), 'date');
      index === 0 && (tempDate.current = date);
      const last = index === data.length - 1;
      const showDate = last || date !== tempDate.current;
      const value = last ? date : tempDate.current;
      tempDate.current = date;

      return (
        <>
          {!last && <ChatBubbleHeader visible={showDate} value={value ?? ''} />}
          <ChatBubble key={index} message={item} />
          {last && <ChatBubbleHeader visible={showDate} value={value ?? ''} />}
        </>
      );
    },
    [data],
  );

  return (
    <FlatList
      scrollEnabled
      snapToEnd
      contentContainerStyle={{
        gap: responsiveWidth(8),
        padding: responsiveWidth(8),
      }}
      data={data}
      renderItem={handleRenderItem}
      inverted
      showsVerticalScrollIndicator={false}
    />
  );
}

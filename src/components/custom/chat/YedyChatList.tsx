import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {responsiveWidth} from '../../../utils/util';
import ChatBubble from './YedyChatBubble';
import {IMessage} from '../../../types/chat';
import React, {useCallback, useRef, useState} from 'react';
import {useServices} from '../../../services';
import ChatBubbleHeader from './YedyChatBubbleHeader';
import ChatQuotedMessage from './YedyChatQuotedMessage';
import YedyFAB from '../YedyFAB';
import {useTheme} from '../../../hooks';

type Props = {
  data: IMessage[];
};

export default ({data}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const tempDate = useRef<string>();
  const listRef = useRef<FlatList>(null);
  const [fabVisible, setFabVisible] = useState(false);

  const handleRenderItem = useCallback(
    ({item, index}: ListRenderItemInfo<IMessage>) => {
      const date = api.helper.formatDateTime(item.date.toString(), 'date');
      index === 0 && (tempDate.current = date);
      const last = index === data.length - 1;
      const showDate = last || date !== tempDate.current;
      const value = last ? date : tempDate.current;
      const quotedMessage = item.quotedMessageId ? data.find(m => m.id === item.quotedMessageId) : undefined;
      tempDate.current = date;

      const handleOnPress = () => {
        if (quotedMessage && listRef.current) {
          listRef.current.scrollToItem({item: quotedMessage, animated: true});
        }
      };

      return (
        <>
          {!last && <ChatBubbleHeader visible={showDate} value={value ?? ''} />}
          <ChatBubble
            key={index}
            message={item}
            quotedMessage={
              quotedMessage ? <ChatQuotedMessage quotedMessage={quotedMessage} onPress={handleOnPress} /> : undefined
            }
          />
          {last && <ChatBubbleHeader visible={showDate} value={value ?? ''} />}
        </>
      );
    },
    [data],
  );

  const handleFab = (isVisible: boolean) => isVisible !== fabVisible && setFabVisible(isVisible);

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={listRef}
        scrollEnabled
        snapToEnd
        contentContainerStyle={{
          gap: responsiveWidth(8),
          padding: responsiveWidth(12),
        }}
        disableScrollViewPanResponder
        data={data}
        renderItem={handleRenderItem}
        inverted
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({viewableItems}) => {
          viewableItems[0].index !== 0 ? handleFab(true) : handleFab(false);
        }}
      />
      <YedyFAB
        icon={'chevron-down'}
        scale={0.5}
        visible={fabVisible}
        color={colors.background}
        style={{
          width: responsiveWidth(40),
          bottom: responsiveWidth(16),
          backgroundColor: colors.secondary,
        }}
        onPress={() => listRef.current?.scrollToIndex({index: 0})}
      />
    </View>
  );
};

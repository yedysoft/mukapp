import {useTheme} from 'react-native-paper';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {Message} from '@stomp/stompjs';

type Props = {
  subDestination: string;
  sendDestination: string;
};

export const MukChat = observer(({subDestination, sendDestination}: Props) => {
  const {colors} = useTheme();
  const {user} = useStores();
  const {api} = useServices();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const readMessages = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  useEffect(() => {
    const chatId = api.socket.subscribe(subDestination, listenPublicChat);
    return () => chatId && api.socket.unsubscribe(chatId);
  }, []);

  const listenPublicChat = (message: Message) => {
    readMessages(JSON.parse(message.body));
  };

  const sendPublicMessage = (m: any) => {
    api.socket.sendMessage(sendDestination, m);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => sendPublicMessage(newMessages)}
      user={{
        _id: user.getUserInfo.id,
      }}
    />
  );
});

import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../components/layouts/MainLayout';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';
import {Message} from '@stomp/stompjs';

export const ChatScreen = observer(() => {
  const {colors} = useTheme();
  const {auth} = useStores();
  const {api} = useServices();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const readMessages = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  useEffect(() => {
    const chatId = api.socket.subscribe('/room/9651ca84-f93a-41a3-ab85-592d6ccdfbf4/publicChat', listenPublicChat);
    return () => chatId && api.socket.unsubscribe(chatId);
  }, []);

  const listenPublicChat = (message: Message) => {
    readMessages(JSON.parse(message.body));
  };

  const sendPublicMessage = (m: any) => {
    api.socket.sendMessage('/app/room/9651ca84-f93a-41a3-ab85-592d6ccdfbf4/sendPublicMessage', m);
  };

  return (
    <MainLayout>
      <GiftedChat
        messages={messages}
        onSend={newMessages => sendPublicMessage(newMessages)}
        user={{
          _id: auth.user.id,
        }}
      />
    </MainLayout>
  );
});

import {useTheme} from 'react-native-paper';
import MainLayout from '../../../components/layouts/MainLayout';
import {GiftedChat, IMessage} from "react-native-gifted-chat";
import {useCallback, useState} from "react";

export default function ChatScreen() {
  const {colors} = useTheme();
  const [messages, setMessages] = useState<IMessage[]>([])

  const onSend = useCallback((messages:IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <MainLayout>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </MainLayout>
  );
}

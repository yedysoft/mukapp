import {observer} from 'mobx-react';
import {YedyChat} from '../../../components/custom';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';
import ChatLayout from '../../../components/layouts/ChatLayout';

const ChatScreen = observer(({route}: any) => {
  const {api} = useServices();
  const {chat} = route.params;
  const {user} = useStores();
  const messages = user.chats.find(c => c.id === chat.id && c.type === chat.type)?.messages ?? [];

  return (
    <ChatLayout>
      <YedyChat
        sendMessage={api.subscription.sendMessage}
        messages={messages}
        receiverId={chat.id}
        messageType={chat.type}
      />
    </ChatLayout>
  );
});

export default ChatScreen;

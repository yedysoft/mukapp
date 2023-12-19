import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {MukChat} from '../../../components/custom/MukChat';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';

const ChatScreen = observer(({route}: any) => {
  const {api} = useServices();
  const {chat} = route.params;
  const {user} = useStores();
  const messages = user.getChats.find(c => c.id === chat.id && c.type === chat.type)?.messages;

  return (
    <MainLayout>
      <MukChat
        sendMessage={api.subscription.sendMessage}
        messages={messages ?? []}
        receiverId={chat.id}
        messageType={chat.type}
      />
    </MainLayout>
  );
});

export default ChatScreen;

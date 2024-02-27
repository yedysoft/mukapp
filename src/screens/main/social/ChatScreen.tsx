import {observer} from 'mobx-react';
import {MukChat} from '../../../components/custom/MukChat';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';
import {SubLayout} from '../../../components/layouts/SubLayout';

const ChatScreen = observer(({route}: any) => {
  const {api} = useServices();
  const {chat} = route.params;
  const {user} = useStores();
  const messages = user.getChats.find(c => c.id === chat.id && c.type === chat.type)?.messages;

  return (
    <SubLayout>
      <MukChat
        sendMessage={api.subscription.sendMessage}
        messages={messages ?? []}
        receiverId={chat.id}
        messageType={chat.type}
      />
    </SubLayout>
  );
});

export default ChatScreen;

import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {MukChat} from '../../../components/custom/MukChat';
import {useServices} from '../../../services';
import {MessageType} from '../../../types/enums';

const ChatScreen = observer(({route}: any) => {
  const {api} = useServices();
  const {chat} = route.params;

  return (
    <MainLayout>
      <MukChat
        sendMessage={
          chat.type === MessageType.Group ? api.subscription.sendGroupMessage : api.subscription.sendPrivateMessage
        }
        messages={chat.messages}
      />
    </MainLayout>
  );
});

export default ChatScreen;

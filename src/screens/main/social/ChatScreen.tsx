import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {MukChat} from '../../../components/custom/MukChat';
import {useServices} from '../../../services';

const ChatScreen = observer(({route}: any) => {
  const {api} = useServices();
  const {chat} = route.params;

  return (
    <MainLayout>
      <MukChat sendMessage={api.subscription.sendMessage} messages={chat.messages} />
    </MainLayout>
  );
});

export default ChatScreen;

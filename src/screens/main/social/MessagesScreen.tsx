import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import CreateChat from '../../../components/messages/CreateChat';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';

export const MessagesScreen = observer(() => {
  const {user, loading} = useStores();
  const {api} = useServices();

  return (
    <MainLayout>
      <MessagesList chats={user.getChats} onRefresh={api.chat.getChats} loading={loading.getChats} />
      <CreateChat />
    </MainLayout>
  );
});

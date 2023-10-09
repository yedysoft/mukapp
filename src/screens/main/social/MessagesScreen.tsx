import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import CreateChat from '../../../components/messages/CreateChat';
import {useStores} from '../../../stores';

export const MessagesScreen = observer(() => {
  const {user} = useStores();

  return (
    <MainLayout>
      <MessagesList chats={user.getChats} />
      <CreateChat />
    </MainLayout>
  );
});

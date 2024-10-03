import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import {useStores} from '../../../stores';
import CreateChatTooltip from '../../../components/tooltips/CreateChatTooltip';
import MukFAB from '../../../components/custom/MukFAB';
import React from 'react';

export default observer(() => {
  const {user} = useStores();
  const tempChats = [...user.getChats];
  const orderedChats = tempChats.sort(
    (a, b) => new Date(b.messages[0]?.date).getTime() - new Date(a.messages[0]?.date).getTime(),
  );

  return (
    <MainLayout>
      <MessagesList chats={orderedChats} />
      <MukFAB tooltip={CreateChatTooltip} icon={'message-square'} />
    </MainLayout>
  );
});

import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import {useStores} from '../../../stores';
import CreateChatTooltip from '../../../components/tooltips/CreateChatTooltip';
import {YedyFAB} from '../../../components/custom';
import React from 'react';
import {responsiveWidth} from '../../../utils/util';

export default observer(() => {
  const {user, room} = useStores();
  const tempChats = [...user.getChats];
  const orderedChats = tempChats.sort(
    (a, b) => new Date(b.messages[0]?.date).getTime() - new Date(a.messages[0]?.date).getTime(),
  );

  return (
    <MainLayout>
      <MessagesList chats={orderedChats} />
      <YedyFAB
        icon={'chat-plus'}
        tooltip={CreateChatTooltip}
        style={{bottom: responsiveWidth(room.isLive ? 128 : 16)}}
      />
    </MainLayout>
  );
});

import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import {useStores} from '../../../stores';
import {YedyFAB} from '../../../components/custom';
import React from 'react';
import {responsiveWidth} from '../../../utils/util';

export default observer(() => {
  const {user, room} = useStores();
  const tempChats = [...user.chats];
  const orderedChats = tempChats.sort(
    (a, b) => new Date(b.messages[0]?.date).getTime() - new Date(a.messages[0]?.date).getTime(),
  );

  return (
    <MainLayout>
      <MessagesList chats={orderedChats} />
      <YedyFAB
        icon={'chat-plus'}
        popup={'createChat'}
        style={{
          bottom: responsiveWidth(room.live ? 128 : 16),
          right: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
    </MainLayout>
  );
});

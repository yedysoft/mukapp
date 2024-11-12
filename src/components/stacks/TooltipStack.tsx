import React from 'react';
import {CreateChat, CreateRoom, Notifications} from './tooltips';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

export default observer(() => {
  const {ui, auth} = useStores();

  return (
    <>
      {auth.loggedIn && (
        <>
          <CreateChat ref={v => ui.setPopup('createChat', v)} />
          <CreateRoom ref={v => ui.setPopup('createRoom', v)} />
          <Notifications ref={v => ui.setPopup('notifications', v)} />
        </>
      )}
    </>
  );
});

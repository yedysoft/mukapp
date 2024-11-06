import React from 'react';
import {CreateChat, CreateRoom, Notifications} from './tooltips';
import {useStores} from '../../stores';

export default () => {
  const {ui} = useStores();

  return (
    <>
      <CreateChat ref={v => ui.setPopup('createChat', v)} />
      <CreateRoom ref={v => ui.setPopup('createRoom', v)} />
      <Notifications ref={v => ui.setPopup('notifications', v)} />
    </>
  );
};

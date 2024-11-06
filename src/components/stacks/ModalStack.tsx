import React from 'react';
import {EditImage, Privacy} from './modals';
import {useStores} from '../../stores';

export default () => {
  const {ui} = useStores();

  return (
    <>
      <Privacy ref={v => ui.setPopup('privacy', v)} />
      <EditImage ref={v => ui.setPopup('editImage', v)} />
    </>
  );
};

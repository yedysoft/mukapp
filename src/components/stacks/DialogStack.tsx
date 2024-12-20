import React from 'react';
import {PremiumNeeded, AuthNeeded} from './dialogs';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

export default observer(() => {
  const {ui, auth} = useStores();

  return (
    <>
      {auth.loggedIn && (
        <>
          <PremiumNeeded ref={v => ui.setPopup('premiumNeeded', v)} />
          <AuthNeeded ref={v => ui.setPopup('authNeeded', v)} />
        </>
      )}
    </>
  );
});

import React from 'react';
import {SpotifyAuthNeeded, SpotifyPremiumNeeded} from './dialogs';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

export default observer(() => {
  const {ui, auth} = useStores();

  return (
    <>
      {auth.loggedIn && (
        <>
          <SpotifyPremiumNeeded ref={v => ui.setPopup('spotifyPremiumNeeded', v)} />
          <SpotifyAuthNeeded ref={v => ui.setPopup('spotifyAuthNeeded', v)} />
        </>
      )}
    </>
  );
});

import React from 'react';
import {SpotifyAuthNeeded, SpotifyPremiumNeeded} from './dialogs';
import {useStores} from '../../stores';

export default () => {
  const {ui} = useStores();

  return (
    <>
      <SpotifyPremiumNeeded ref={v => ui.setPopup('spotifyPremiumNeeded', v)} />
      <SpotifyAuthNeeded ref={v => ui.setPopup('spotifyAuthNeeded', v)} />
    </>
  );
};

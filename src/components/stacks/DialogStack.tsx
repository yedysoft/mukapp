import {observer} from 'mobx-react';
import React from 'react';
import {SpotifyAuthNeeded, SpotifyPremiumNeeded} from './dialogs';
import {YedyDialogScreenRef} from '../custom';

type keys = 'spotifyPremiumNeeded' | 'spotifyAuthNeeded';
const dialogs: Map<keys, YedyDialogScreenRef | null> = new Map<keys, YedyDialogScreenRef | null>();

export default observer(() => {
  return (
    <>
      <SpotifyPremiumNeeded ref={v => dialogs.set('spotifyPremiumNeeded', v)} />
      <SpotifyAuthNeeded ref={v => dialogs.set('spotifyAuthNeeded', v)} />
    </>
  );
});

export const openDialog = (key: keys) => {
  const ref = dialogs.get(key);
  if (ref) {
    ref.open();
  }
};

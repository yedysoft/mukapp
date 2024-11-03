import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import React from 'react';
import {useServices} from '../../services';
import {useTheme} from '../../hooks';
import PremiumNeeded from './dialogs/SpotifyPremiumNeeded';

export default observer(() => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {media} = useStores();

  const handleAuth = async () => {
    await api.auths.connectAccount('SPOTIFY', 'Spotify');
  };

  return (
    <>
      <PremiumNeeded />
    </>
  );
});

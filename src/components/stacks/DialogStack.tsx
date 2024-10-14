import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import React from 'react';
import {useServices} from '../../services';

export default observer(() => {
  const {api} = useServices();
  const {media} = useStores();

  const handleAuth = async () => {
    await api.auths.connectAccount('SPOTIFY', 'Spotify');
  };

  const handlePremium = async () => {
    const authUrl = 'https://www.spotify.com/premium';
    authUrl && (await api.helper.openURL(authUrl));
    media.set('spotifyPremiumNeeded', false);
  };

  return <></>;
});

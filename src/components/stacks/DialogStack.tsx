import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukDialog from '../custom/MukDialog';
import React from 'react';
import {useServices} from '../../services';
import {Portal} from 'react-native-paper';

const DialogStack = observer(() => {
  const {api} = useServices();
  const {media} = useStores();

  const handleAuth = async () => {
    const authUrl = await api.media.getAuthUrl();
    authUrl && (await api.helper.openURL(authUrl));
    media.set('authenticated', true);
  };

  const handlePremium = async () => {
    const authUrl = 'https://www.spotify.com/premium'
    authUrl && (await api.helper.openURL(authUrl));
    media.set('authenticated', true);
  };

  return (
    <Portal>
      <MukDialog
        visible={!media.getAuthenticated}
        onReject={() => media.set('authenticated', true)}
        onAccept={handleAuth}
        name={'spotify'}
      />
      <MukDialog
        visible={media.spotifyPremiumNeeded}
        onReject={() => media.set('spotifyPremiumNeeded', false)}
        onAccept={handlePremium}
        name={'spotifyPremium'}
      />
    </Portal>
  );
});

export default DialogStack;

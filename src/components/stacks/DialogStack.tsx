import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukDialog from '../custom/MukDialog';
import React from 'react';
import {useServices} from '../../services';
import {View} from 'react-native';

const DialogStack = observer(() => {
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

  return (
    <View>
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
    </View>
  );
});

export default DialogStack;

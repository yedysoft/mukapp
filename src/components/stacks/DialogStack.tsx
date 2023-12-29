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

  return (
    <Portal>
      <MukDialog
        visible={!media.getAuthenticated}
        onReject={() => media.set('authenticated', true)}
        onAccept={handleAuth}
        title={'Yetkilendirme Gerekli'}
        content={'Devam etmek için Spotify yetkilendirmesi gerekli. Şimdi yetkilendirmek ister misin?'}
        labelReject={'Hatırlat'}
        labelAccept={'Yetkilendir'}
      />
    </Portal>
  );
});

export default DialogStack;

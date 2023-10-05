import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukDialog from '../custom/MukDialog';
import React, {useState} from 'react';
import {useServices} from '../../services';

const DialogStack = observer(() => {
  const {api} = useServices();
  const {media} = useStores();
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    const authUrl = await api.media.getAuthUrl();
    authUrl && (await api.helper.openURL(authUrl));
    setLoading(false);
    media.set('authenticated', true);
  };

  return (
    <View>
      <MukDialog
        visible={!media.getAuthenticated}
        onReject={() => media.set('authenticated', true)}
        onAccept={handleAuth}
        loading={loading}
        title={'Yetkilendirme Gerekli'}
        content={'Devam etmek için Spotify yetkilendirmesi gerekli. Şimdi yetkilendirmek ister misin?'}
        labelReject={'Hatırlat'}
        labelAccept={'Yetkilendir'}
      />
    </View>
  );
});

export default DialogStack;

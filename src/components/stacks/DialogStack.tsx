import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukDialog from '../custom/MukDialog';
import React, {useEffect} from 'react';
import {useServices} from '../../services';
import {screenWidth} from '../../utils/Responsive';

const DialogStack = observer(() => {
  const {api} = useServices();
  const {media} = useStores();

  const handleAuth = async () => {
    const authUrl = await api.media.getAuthUrl();
    authUrl && (await api.helper.openURL(authUrl));
    media.set('authenticated', true);
  };

  useEffect(() => {
    console.log(media.authenticated);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1400,
        width: screenWidth,
        top: screenWidth / 2,
        left: 0,
      }}
    >
      <MukDialog
        visible={!media.getAuthenticated}
        onReject={() => media.set('authenticated', true)}
        onAccept={handleAuth}
        title={'Yetkilendirme Gerekli'}
        content={'Devam etmek için Spotify yetkilendirmesi gerekli. Şimdi yetkilendirmek ister misin?'}
        labelReject={'Hatırlat'}
        labelAccept={'Yetkilendir'}
      />
    </View>
  );
});

export default DialogStack;

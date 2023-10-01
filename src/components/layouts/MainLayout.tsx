import {useTheme} from 'react-native-paper';
import {ReactNode, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {screenWidth} from '../../utils/Responsive';
import MukDialog from '../custom/MukDialog';
import {useStores} from '../../stores';
import {useServices} from '../../services';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme();
  const {media} = useStores();
  const {api} = useServices();

  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    const authUrl = await api.media.getAuthUrl();
    authUrl && await api.helper.openURL(authUrl);
    setLoading(false);
    media.set('authenticated', true)
  };

  return (
    <View style={[{flex: 1, flexDirection: 'column', width: screenWidth, backgroundColor: colors.background}, style]}>
      {children}
      {/*<PlayingTrack compact />*/}
      <MukDialog
        visible={!media.getAuthenticated}
        onReject={() => media.set('authenticated', true)}
        onAccept={handleAuth}
        isLoading={loading}
        title={'Yetkilendirme Gerekli'}
        content={'Devam etmek için Spotify yetkilendirmesi gerekli. Şimdi yetkilendirmek ister misin?'}
        labelReject={'Hatırlat'}
        labelAccept={'Yetkilendir'}
      />
    </View>
  );
});

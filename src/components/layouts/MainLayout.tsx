import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {screenWidth} from '../../utils/Responsive';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme();
  //const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <View style={[{flex: 1, flexDirection: 'column', width: screenWidth, backgroundColor: colors.background}, style]}>
      {children}
      {/*<PlayingTrack compact />*/}
      {/*<MukDialog visible={isAuthenticated} onReject={() => setIsAuthenticated(false)} title={'Yetkilendirme Gerekli'}
                 content={'Devam etmek için Spotify yetkilendirmesi gerekli. Şimdi yetkilendirmek ister misin?'} labelReject={'Hatırlat'} labelAccept={'Yetkilendir'}/>*/}
    </View>
  );
});

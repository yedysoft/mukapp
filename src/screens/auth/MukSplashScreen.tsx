import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import MukLogo from '../../components/custom/MukLogo';

export default function MukSplashScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MukLogo imageStyle={{width: 40, aspectRatio: 0.5}} />
    </View>
  );
}

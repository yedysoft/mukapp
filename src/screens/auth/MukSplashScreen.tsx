import {View} from 'react-native';
import {useTheme} from '../../hooks';
import {YedyLogo} from '../../components/custom';

export default function MukSplashScreen() {
  const {colors} = useTheme();

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
      <YedyLogo imageStyle={{width: 40, aspectRatio: 0.5}} />
    </View>
  );
}

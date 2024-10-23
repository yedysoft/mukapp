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
      <YedyLogo scale={2.3} />
    </View>
  );
}

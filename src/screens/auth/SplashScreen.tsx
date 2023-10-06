import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';

export default function SplashScreen() {
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
      <MukImage scale={2} source={require('../../../assets/loader.gif')} />
    </View>
  );
}

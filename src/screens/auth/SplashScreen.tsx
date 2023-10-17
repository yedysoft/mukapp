import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MukLoader from '../../components/loading/MukLoader';

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
      <MukLoader loading={true} scale={2} />
    </View>
  );
}

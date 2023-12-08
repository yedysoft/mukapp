import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MukLoader from '../../components/loading/MukLoader';
import {MukTheme} from '../../types';

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
      <MukLoader loading={true} scale={2} />
    </View>
  );
}

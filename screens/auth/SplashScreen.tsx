import {useTheme} from 'react-native-paper';
import {View} from 'react-native';

export default function SplashScreen() {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: colors.primary}}/>
  );
}

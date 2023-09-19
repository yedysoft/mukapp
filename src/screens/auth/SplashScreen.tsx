import {useTheme} from 'react-native-paper';
import {ActivityIndicator, View} from 'react-native';

export default function SplashScreen() {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator animating={true} size={'large'} color={colors.background} />
    </View>
  );
}

import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function SplashScreen() {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator animating={true} size={'large'} color={colors.primary} />
    </View>
  );
}

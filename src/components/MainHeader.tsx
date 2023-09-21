import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import MukIconButton from './custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import MukLogo from './custom/MukLogo';
import {useNavigation} from '@react-navigation/native';

export default function MainHeader() {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(8),
        paddingTop: responsiveHeight(16),
        paddingBottom: responsiveHeight(-16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <MukIconButton icon={'bell-outline'} scale={0.4} onPress={() => navigation.getParent('StartDrawer').openDrawer()} />
      <MukLogo />
      <MukIconButton icon={'message-outline'} scale={0.4} onPress={() => navigation.getParent('EndDrawer').openDrawer()} />
    </SafeAreaView>
  );
}

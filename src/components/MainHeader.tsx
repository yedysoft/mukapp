import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import MukIconButton from './custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import MukLogo from './custom/MukLogo';

export default function MainHeader() {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <MukIconButton icon={'blank'} scale={0.5} />
      <MukLogo />
      <MukIconButton icon={'blank'} scale={0.5} />
    </SafeAreaView>
  );
}

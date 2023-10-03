import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {useStores} from '../../stores';

export default function MenuFooter() {
  const {colors} = useTheme();
  const {ui} = useStores();
  const {api} = useServices();
  const toggleTheme = ui.appearance === 'light' ? 'dark' : 'light';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(16),
      }}
    >
      <MukIconButton icon={'logout'} onPress={() => api.auth.logout()} scale={0.5} style={{}} color={colors.error} />
      <MukIconButton
        icon={'theme-light-dark'}
        color={colors.secondary}
        onPress={() => ui.set('appearance', toggleTheme)}
        scale={0.5}
      />
    </View>
  );
}

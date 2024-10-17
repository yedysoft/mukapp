import {View} from 'react-native';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {YedyIconButton} from '../custom';
import {useServices} from '../../services';
import {useStores} from '../../stores';

export default function MenuFooter() {
  const {colors} = useTheme();
  const {ui} = useStores();
  const {api} = useServices();
  const toggleTheme = ui.getScheme === 'light' ? 'dark' : 'light';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(16),
      }}
    >
      <YedyIconButton icon={'logout'} onPress={api.auth.logout} scale={0.6} color={colors.error} />
      <YedyIconButton
        icon={toggleTheme === 'light' ? 'weather-night' : 'weather-sunny'}
        color={colors.secondary}
        onPress={() => ui.set('appearance', toggleTheme)}
        scale={0.6}
      />
    </View>
  );
}

import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import YedyIconButton from '../custom/YedyIconButton';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

export default function MenuFooter() {
  const {colors} = useTheme<MukTheme>();
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
      <YedyIconButton icon={'log-out'} onPress={api.auth.logout} scale={0.5} color={colors.error} />
      <YedyIconButton
        icon={toggleTheme === 'light' ? 'moon' : 'sun'}
        color={colors.secondary}
        onPress={() => ui.set('appearance', toggleTheme)}
        scale={0.5}
      />
    </View>
  );
}

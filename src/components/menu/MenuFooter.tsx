import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {stores, useStores} from '../../stores';

export default function MenuFooter() {
  const {colors} = useTheme();
  const {ui} = useStores();
  const {api} = useServices();

  const toggleTheme = stores.ui.appearance == 'light' ? 'dark' : 'light'

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(16)}}>
      <MukIconButton icon={'logout'} onPress={() => api.auth.logout()} scale={.5} style={{}}
                     color={'rgba(255, 55, 95, 1)'}/>
      <MukIconButton icon={'theme-light-dark'} onPress={() => ui.set('appearance', toggleTheme)} scale={.5}/>
    </View>
  );
}

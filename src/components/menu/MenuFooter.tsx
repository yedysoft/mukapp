import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';

export default function MenuFooter() {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(16)}}>
      <MukIconButton icon={'logout'} onPress={() => api.auth.logout()} scale={.5} style={{}}
                     color={'rgba(255, 55, 95, 1)'}/>
      <MukIconButton icon={'theme-light-dark'} onPress={() => api.auth.logout()} scale={.5} style={{}}/>
    </View>
  );
}

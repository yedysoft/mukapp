import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';
import {TouchableOpacity, View} from 'react-native';
import MukIcon from '../../components/custom/MukIcon';
import {useServices} from '../../services';

export default function SideScreen() {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <DrawerLayout>
      <HorizontalUser />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
          }}
          onPress={() => api.auth.logout()}
        >
          <MukIcon icon={'logout'} scale={0.8} color={'red'} />
        </TouchableOpacity>
      </View>
    </DrawerLayout>
  );
}

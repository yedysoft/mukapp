import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import EndDrawer from './EndDrawer';
import {screenWidth} from '../utils/Responsive';
import Notifications from '../screens/main/side/Notifications';

const Start = createDrawerNavigator();
export default function StartDrawer() {
  const {colors} = useTheme();

  return (
    <Start.Navigator
      id={'StartDrawer'}
      backBehavior="none"
      initialRouteName="EndDrawer"
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {},
        drawerContentContainerStyle: {},
        sceneContainerStyle: {backgroundColor: colors.primary},
        drawerPosition: 'left',
        swipeEdgeWidth: screenWidth / 2,
      }}
      drawerContent={() => <Notifications />}
    >
      <Start.Screen name="EndDrawer" component={EndDrawer} options={{headerShown: false}} />
    </Start.Navigator>
  );
}

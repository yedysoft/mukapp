import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import {screenWidth} from '../utils/Responsive';
import Notifications from '../screens/main/side/Notifications';
import MainStack from './MainStack';

const Main = createDrawerNavigator();
export default function MainDrawer() {
  const {colors} = useTheme();

  return (
    <Main.Navigator
      id={'MainDrawer'}
      backBehavior="none"
      initialRouteName="DrawerMain"
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {},
        drawerContentContainerStyle: {},
        drawerPosition: 'left',
        swipeEdgeWidth: screenWidth / 4,
      }}
      drawerContent={() => <Notifications />}
    >
      <Main.Screen name="DrawerMain" component={MainStack} options={{headerShown: false}} />
    </Main.Navigator>
  );
}

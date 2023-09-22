import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import {screenWidth} from '../utils/Responsive';
import Notifications from '../screens/main/side/Notifications';
import BottomTab from './BottomTab';

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
        swipeEdgeWidth: screenWidth,
      }}
      drawerContent={() => <Notifications />}
    >
      <Main.Screen name="DrawerMain" component={BottomTab} options={{headerShown: false}} />
    </Main.Navigator>
  );
}

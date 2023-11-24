import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import {screenWidth} from '../utils/util';
import SideScreen from '../screens/main/SideScreen';
import MainStack from './MainStack';
import {MukTheme} from '../types';

const Main = createDrawerNavigator();
export default function MainDrawer() {
  const {colors} = useTheme<MukTheme>();

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
      drawerContent={() => <SideScreen />}
    >
      <Main.Screen name="DrawerMain" component={MainStack} options={{headerShown: false}} />
    </Main.Navigator>
  );
}

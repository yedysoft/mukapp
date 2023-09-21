import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import BottomTab from './BottomTab';
import DrawerLayout from '../components/layouts/DrawerLayout';
import {screenWidth} from '../utils/Responsive';

const End = createDrawerNavigator();
export default function EndDrawer() {
  const {colors} = useTheme();

  return (
    <End.Navigator
      id={'EndDrawer'}
      backBehavior="none"
      initialRouteName="DrawerMain"
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {},
        drawerContentContainerStyle: {},
        sceneContainerStyle: {backgroundColor: colors.primary},
        drawerPosition: 'right',
        swipeEdgeWidth: screenWidth / 2,
      }}
      drawerContent={() => <DrawerLayout />}
    >
      <End.Screen name="DrawerMain" component={BottomTab} options={{headerShown: false}} />
    </End.Navigator>
  );
}

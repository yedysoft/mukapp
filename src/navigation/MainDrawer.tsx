import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import SideScreen from '../screens/main/SideScreen';
import MainStack from './MainStack';
import {MukTheme} from '../types';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Main = createDrawerNavigator();
export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

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
        swipeEdgeWidth: ui.windowWidth / 4,
      }}
      drawerContent={() => <SideScreen />}
    >
      <Main.Screen
        name="DrawerMain"
        component={MainStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items';
          return {headerShown: false, swipeEnabled: !['Chat'].includes(routeName)};
        }}
      />
    </Main.Navigator>
  );
});

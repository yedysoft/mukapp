import {createDrawerNavigator} from '@react-navigation/drawer';
import SideScreen from '../screens/main/SideScreen';
import MainStack from './MainStack';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {responsiveWidth} from '../utils/util';

const Main = createDrawerNavigator();
export default observer(() => {
  const {ui} = useStores();

  return (
    <Main.Navigator
      id={'MainDrawer'}
      backBehavior={'none'}
      initialRouteName={'DrawerMain'}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {width: responsiveWidth(300)},
        drawerContentContainerStyle: {},
        drawerPosition: 'left',
        swipeEdgeWidth: ui.windowWidth / 4,
      }}
      drawerContent={() => <SideScreen />}
    >
      <Main.Screen
        name={'DrawerMain'}
        component={MainStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items';
          return {headerShown: false, swipeEnabled: !['Chat', 'Room'].includes(routeName)};
        }}
      />
    </Main.Navigator>
  );
});

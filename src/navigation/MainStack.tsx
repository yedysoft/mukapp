import {createStackNavigator} from '@react-navigation/stack';
import RoomScreen from '../screens/main/room';
import BottomTabs from './BottomTabs';
import {SubHeader} from '../components/header/SubHeader';
import ChatScreen from '../screens/main/social/ChatScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import TaskScreen from '../screens/main/TaskScreen';
import PremiumScreen from '../screens/main/PremiumScreen';
import {SearchScreen} from '../screens/main/social/SearchScreen';
import {NotificationsScreen} from '../screens/main/NotificationsScreen';

const Main = createStackNavigator();

export default function MainStack() {
  return (
    <Main.Navigator initialRouteName={'Main'}>
      <Main.Screen name="Main" component={BottomTabs} options={{headerShown: false}} />
      <Main.Group screenOptions={{headerTransparent: true, header: () => <SubHeader />}}>
        <Main.Screen name="Room" component={RoomScreen} />
      </Main.Group>
      <Main.Group screenOptions={{header: () => <SubHeader />}}>
        <Main.Screen name="Chat" component={ChatScreen} />
        <Main.Screen name="Profile" component={ProfileScreen} />
        <Main.Screen name="Search" component={SearchScreen} />
        <Main.Screen name="Notifications" component={NotificationsScreen} />
        <Main.Screen name="Task" component={TaskScreen} />
        <Main.Screen name="Premium" component={PremiumScreen} />
      </Main.Group>
    </Main.Navigator>
  );
}

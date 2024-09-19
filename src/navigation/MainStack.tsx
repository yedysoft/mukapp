import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import RoomScreen from '../screens/main/RoomScreen';
import BottomTabs from './BottomTabs';
import SubHeader from '../components/header/SubHeader';
import ChatScreen from '../screens/main/social/ChatScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import TaskScreen from '../screens/main/TaskScreen';
import PremiumScreen from '../screens/main/PremiumScreen';
import {SearchScreen} from '../screens/main/social/SearchScreen';
import {NotificationsScreen} from '../screens/main/NotificationsScreen';
import {SettingsScreen} from '../screens/main/SettingsScreen';
import BlockedScreen from '../screens/main/social/BlockedScreen';
import EditScreen from '../screens/main/EditScreen';
import {PsScreen} from '../screens/main/PsScreen';
import {IChat} from '../types/chat';
import {MainHeader} from "../components/header/MainHeader";

export type MainStackScreens = {
  Main: undefined;
  Room: undefined;
  Chat: {chat: IChat};
  Profile: {userId?: string};
  Search: undefined;
  Notifications: undefined;
  Task: undefined;
  Premium: undefined;
  PS: undefined;
  Settings: undefined;
  Blocked: undefined;
  Edit: undefined;
};
export type MainStackNavProp = StackNavigationProp<MainStackScreens, 'Main'>;

const Main = createStackNavigator<MainStackScreens>();

export default function MainStack() {
  return (
    <Main.Navigator initialRouteName={'Main'}>
      <Main.Screen name="Main" component={BottomTabs} options={{headerShown: true, header: () => <MainHeader />}} />
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
        <Main.Screen name="PS" component={PsScreen} />
        <Main.Screen name="Settings" component={SettingsScreen} />
        <Main.Screen name="Blocked" component={BlockedScreen} />
        <Main.Screen name="Edit" component={EditScreen} />
      </Main.Group>
    </Main.Navigator>
  );
}

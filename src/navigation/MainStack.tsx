import {createStackNavigator} from '@react-navigation/stack';
import RoomScreen from '../screens/main/room';
import BottomTabs from './BottomTabs';

const Main = createStackNavigator();

export default function MainStack() {
  return (
    <Main.Navigator initialRouteName={'Main'}>
      <Main.Screen name="Main" component={BottomTabs} options={{headerShown: false}} />
      <Main.Screen name="Room" component={RoomScreen} options={{headerShown: false}} />
    </Main.Navigator>
  );
}

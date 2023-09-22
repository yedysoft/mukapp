import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/main/HomeScreen';
import RoomScreen from '../screens/main/room';

const Main = createStackNavigator();
export default function MainStack() {
  return (
    <Main.Navigator initialRouteName={'Home'}>
      <Main.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Main.Screen name="Room" component={RoomScreen} options={{headerShown: false}} />
    </Main.Navigator>
  );
}

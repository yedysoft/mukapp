import {createStackNavigator} from '@react-navigation/stack';
import RoomScreen from '../screens/main/room';
import BottomTabs from './BottomTabs';
import {SubHeader} from '../components/header/SubHeader';

const Main = createStackNavigator();

export default function MainStack() {
  return (
    <Main.Navigator initialRouteName={'Main'}>
      <Main.Screen name="Main" component={BottomTabs} options={{headerShown: false}} />
      <Main.Group screenOptions={{headerTransparent: true, header: () => <SubHeader />}}>
        <Main.Screen name="Room" component={RoomScreen} />
      </Main.Group>
    </Main.Navigator>
  );
}

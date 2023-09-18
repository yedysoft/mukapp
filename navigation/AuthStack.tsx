import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';

const Auth = createStackNavigator();
export default function AuthStack() {

  return(
    <Auth.Navigator initialRouteName={'Login'}>
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Auth.Screen name="Register" component={LoginScreen} options={{headerShown: false}} />
    </Auth.Navigator>
  )
}

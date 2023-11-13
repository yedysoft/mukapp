import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {WelcomeScreen} from '../screens/auth/WelcomeScreen';
import {ForgotScreen} from '../screens/auth/ForgotScreen';

const Auth = createStackNavigator();
export default function AuthStack() {
  return (
    <Auth.Navigator initialRouteName={'Welcome'}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Auth.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}}/>
      <Auth.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
    </Auth.Navigator>
  );
}

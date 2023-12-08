import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {ForgotScreen} from '../screens/auth/ForgotScreen';
import {SettingsScreen} from '../screens/main/SettingsScreen';

type AuthStackScreens = {
  Welcome: undefined;
  Login: undefined;
  Forgot: undefined;
  Register: undefined;
};
export type AuthStackNavProp = StackNavigationProp<AuthStackScreens, 'Welcome'>;

const Auth = createStackNavigator<AuthStackScreens>();

export default function AuthStack() {
  return (
    <Auth.Navigator initialRouteName={'Welcome'}>
      <Auth.Screen name="Welcome" component={SettingsScreen} options={{headerShown: false}} />
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Auth.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}} />
      <Auth.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
    </Auth.Navigator>
  );
}

import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {WelcomeScreen} from '../screens/auth/WelcomeScreen';
import {ForgotScreen} from '../screens/auth/ForgotScreen';

type AuthStackScreens = {
  Welcome: undefined;
  Login: undefined;
  Forgot: undefined;
  Register: undefined;
};
export type WelcomeNavProp = StackNavigationProp<AuthStackScreens, 'Welcome'>;
export type LoginNavProp = StackNavigationProp<AuthStackScreens, 'Login'>;
export type ForgotNavProp = StackNavigationProp<AuthStackScreens, 'Forgot'>;
export type RegisterNavProp = StackNavigationProp<AuthStackScreens, 'Register'>;

const Auth = createStackNavigator<AuthStackScreens>();

export default function AuthStack() {
  return (
    <Auth.Navigator initialRouteName={'Welcome'}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Auth.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}} />
      <Auth.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
    </Auth.Navigator>
  );
}

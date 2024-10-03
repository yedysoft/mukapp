import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {ForgotScreen} from '../screens/auth/ForgotScreen';
import {WelcomeScreen} from '../screens/auth/WelcomeScreen';
import NewPassScreen from '../screens/auth/NewPassScreen';

type AuthStackScreens = {
  Welcome: undefined;
  Login: undefined;
  Forgot: undefined;
  Register: undefined;
  NewPassScreen: undefined;
};
export type AuthStackNavProp = StackNavigationProp<AuthStackScreens, 'Login'>;

const Auth = createStackNavigator<AuthStackScreens>();

export default () => {
  return (
    <Auth.Navigator initialRouteName={'Login'}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Auth.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}} />
      <Auth.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
      <Auth.Screen
        name="NewPassScreen"
        component={NewPassScreen}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </Auth.Navigator>
  );
};

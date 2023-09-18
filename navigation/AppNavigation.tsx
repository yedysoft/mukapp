import AuthStack from './AuthStack';
import {CombinedTheme} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BottomTab';

export default function AppNavigation() {
  const isAuthenticated = false
  return (
    <NavigationContainer theme={CombinedTheme}>
      {isAuthenticated ?
        <AuthStack/>
        :
        <BottomTab />
      }
    </NavigationContainer>
  );
}

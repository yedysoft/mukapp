import AuthStack from './AuthStack';
import {CombinedTheme} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import StartDrawer from './StartDrawer';

export const AppNavigation = observer(() => {
  return <NavigationContainer theme={CombinedTheme}>{!stores.auth.isLoggedIn ? <StartDrawer /> : <AuthStack />}</NavigationContainer>;
});

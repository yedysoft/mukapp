import AuthStack from './AuthStack';
import {CombinedTheme} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import MainDrawer from './MainDrawer';

export const AppNavigation = observer(() => {
  return <NavigationContainer theme={CombinedTheme}>{stores.auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}</NavigationContainer>;
});

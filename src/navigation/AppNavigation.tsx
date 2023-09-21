import AuthStack from './AuthStack';
import {CombinedTheme} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import WrapDrawer from './drawer/WrapDrawer';
import {observer} from 'mobx-react';
import {stores} from '../stores';

export const AppNavigation = observer(() => {
  return <NavigationContainer theme={CombinedTheme}>{stores.auth.isLoggedIn ? <WrapDrawer /> : <AuthStack />}</NavigationContainer>;
});

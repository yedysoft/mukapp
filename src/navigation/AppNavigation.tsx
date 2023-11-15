import AuthStack from './AuthStack';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import MainDrawer from './MainDrawer';

export const AppNavigation = observer(() => {
  return (
    <NavigationContainer theme={stores.ui.getTheme as unknown as Theme}>
      {stores.auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
});

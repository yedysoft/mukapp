import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import MainDrawer from './MainDrawer';

export const AppNavigation = observer(() => {
  return (
    <NavigationContainer theme={stores.ui.getTheme}>
      {stores.auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
});

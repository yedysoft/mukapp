import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import MainDrawer from './MainDrawer';
import NewPassScreen from '../screens/auth/NewPassScreen';

export default observer(() => {
  const {auth} = useStores();

  if (auth.isNeededPassChange) {
    return <NewPassScreen />;
  }
  return <>{auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}</>;
});

import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import MainDrawer from './MainDrawer';

export default observer(() => {
  const {auth} = useStores();

  return <>{auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}</>;
});

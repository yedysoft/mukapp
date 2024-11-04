import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import MainDrawer from './MainDrawer';
import {YedyMessageStack} from '../components/custom';
import DialogStack from '../components/stacks/DialogStack';

export default observer(() => {
  const {auth} = useStores();

  return (
    <>
      <YedyMessageStack />
      <DialogStack />
      {auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}
    </>
  );
});

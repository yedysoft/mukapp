import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import MainDrawer from './MainDrawer';
import {YedyMessageStack} from '../components/custom';
import DialogStack from '../components/stacks/DialogStack';
import ModalStack from '../components/stacks/ModalStack';
import TooltipStack from '../components/stacks/TooltipStack';

export default observer(() => {
  const {auth} = useStores();

  return (
    <>
      <YedyMessageStack />
      <DialogStack />
      <ModalStack />
      <TooltipStack />
      {auth.loggedIn ? <MainDrawer /> : <AuthStack />}
    </>
  );
});

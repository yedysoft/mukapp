import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import MainDrawer from './MainDrawer';

export const AppNavigation = observer(() => <>{stores.auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}</>);

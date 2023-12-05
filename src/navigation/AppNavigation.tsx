import AuthStack from './AuthStack';
import {observer} from 'mobx-react';
import {stores} from '../stores';
import MainDrawer from './MainDrawer';
import {View} from 'react-native';
import {screenHeight, screenWidth} from '../utils/util';

export const AppNavigation = observer(({onLayout}: {onLayout: () => void}) => (
  <View style={{width: screenWidth, height: screenHeight}} onLayout={onLayout}>
    {stores.auth.isLoggedIn ? <MainDrawer /> : <AuthStack />}
  </View>
));

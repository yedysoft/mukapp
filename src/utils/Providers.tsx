import React, {PropsWithChildren} from 'react';
import {stores, StoresProvider} from '../stores';
import {ServicesProvider} from '../services';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from '../navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {YedyPortalProvider} from '../components/custom';
import {observer} from 'mobx-react';

export const AppProvider = observer(({children}: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <StoresProvider>
        <ServicesProvider>
          <NavigationContainer ref={navigationRef} theme={stores.ui.getTheme as any}>
            <YedyPortalProvider>{children}</YedyPortalProvider>
          </NavigationContainer>
        </ServicesProvider>
      </StoresProvider>
    </SafeAreaProvider>
  );
});

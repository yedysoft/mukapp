import React, {PropsWithChildren} from 'react';
import {StoresProvider} from '../stores';
import {ServicesProvider} from '../services';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from '../navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import YedyPortalProvider from '../components/custom/YedyPortalProvider';

export const AppProvider = ({children}: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StoresProvider>
          <ServicesProvider>
            <YedyPortalProvider>{children}</YedyPortalProvider>
          </ServicesProvider>
        </StoresProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

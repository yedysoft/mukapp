import React, {PropsWithChildren} from 'react';
import {StoresProvider} from '../stores';
import {ServicesProvider} from '../services';
import YedyPortalProvider from '../components/custom/YedyPortalProvider';

export const AppProvider: React.FC<PropsWithChildren<NonNullable<unknown>>> = ({children}) => {
  return (
    <YedyPortalProvider>
      <StoresProvider>
        <ServicesProvider>{children}</ServicesProvider>
      </StoresProvider>
    </YedyPortalProvider>
  );
};

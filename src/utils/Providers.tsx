import React, {PropsWithChildren} from 'react';
import {StoresProvider} from '../stores';
import {ServicesProvider} from '../services';

export const AppProvider: React.FC<PropsWithChildren<NonNullable<unknown>>> = ({children}) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};

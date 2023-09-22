import React from 'react';

import './_hydration';
import {UIStore} from './ui';
import {AuthStore} from './auth';
import {BaseStore} from './base';
import {UserStore} from './user';

class Stores {
  ui = new UIStore();
  auth = new AuthStore();
  user = new UserStore();
}
export const stores = new Stores();

const StoresContext = React.createContext<Stores>(stores);
export const StoresProvider = ({children}: any) => <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
export const useStores = (): Stores => React.useContext(StoresContext);

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as any)[key] as BaseStore<any>;
      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};

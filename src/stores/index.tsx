import './_hydration';
import React from 'react';
import {BaseStore} from './base';
import ui from './ui';
import auth from './auth';
import user from './user';
import media from './media';
import room from './room';
import loading from './loading';
import main from './main';
import {PVoid} from '../types';

class Stores {
  ui = ui;
  auth = auth;
  user = user;
  media = media;
  room = room;
  loading = loading;
  main = main;
}
export const stores = new Stores();

const StoresContext = React.createContext<Stores>(stores);
export const StoresProvider = ({children}: any) => (
  <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);
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

export const stopPersists = () => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as any)[key] as BaseStore<any>;
      if (s.stopPersist) {
        s.stopPersist();
      }
    }
  }
};

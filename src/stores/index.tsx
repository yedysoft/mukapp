import './_hydration';
import React, {useEffect, useState} from 'react';
import ui from './ui';
import auth from './auth';
import user from './user';
import media from './media';
import room from './room';
import loading from './loading';
import main from './main';
import {reaction} from 'mobx';

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
export const StoresProvider = ({children}: any) => {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    return reaction(
      () => ui.getLanguage,
      () => {
        setRenderKey(prevKey => prevKey + 1);
      },
    );
  }, [ui]);

  console.log('renderKey', renderKey);

  return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};

export const useStores = (): Stores => React.useContext(StoresContext);

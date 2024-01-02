import React from 'react';
import translate from './translate';
import api from './api';
import {IService, PVoid} from '../types';

class Services {
  t = translate;
  api = api;
}
export const services = new Services();

const ServicesContext = React.createContext<Services>(services);
export const ServicesProvider = ({children}: any) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);
export const useServices = (): Services => React.useContext(ServicesContext);

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as any)[key] as IService;

      if (s.init) {
        await s.init();
      }
    }
  }
};

import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

type PortalContextType = {
  addPortal: (key: string, component: ReactNode) => void;
  removePortal: (key: string) => void;
};

type PortalItem = {
  key: string;
  component: ReactNode;
};

type Props = {
  children: ReactNode;
};

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

export default ({children}: Props) => {
  const [portals, setPortals] = useState<PortalItem[]>([]);

  const addPortal = useCallback((key: string, component: ReactNode) => {
    setPortals(prev => [...prev, {key, component}]);
  }, []);

  const removePortal = useCallback((key: string) => {
    setPortals(prev => prev.filter(portal => portal.key !== key));
  }, []);

  return (
    <PortalContext.Provider value={{addPortal, removePortal}}>
      {children}
      {portals.map(portal => (
        <View key={portal.key} style={StyleSheet.absoluteFill} pointerEvents={'box-none'} collapsable={false}>
          {portal.component}
        </View>
      ))}
    </PortalContext.Provider>
  );
};

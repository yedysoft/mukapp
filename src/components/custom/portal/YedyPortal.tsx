import {ReactNode, useEffect, useRef} from 'react';
import {usePortal} from './YedyPortalProvider';

type Props = {
  zIndex?: number;
  children: ReactNode;
};

export default ({zIndex, children}: Props) => {
  const {addPortal, removePortal} = usePortal();
  const key = useRef<string>(Math.random().toString(36).substring(2, 11)).current;

  useEffect(() => {
    addPortal(key, children, zIndex);
    return () => {
      removePortal(key);
    };
  }, [children]);

  return null;
};
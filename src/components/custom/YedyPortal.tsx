import {ReactNode, useEffect, useRef} from 'react';
import {usePortal} from './YedyPortalProvider';

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  const {addPortal, removePortal} = usePortal();
  const key = useRef<string>(Math.random().toString(36).substring(2, 11)).current;

  useEffect(() => {
    addPortal(key, children);
    return () => {
      removePortal(key);
    };
  }, [children]);

  return null;
};

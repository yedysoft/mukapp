import {useStores} from '../stores';
import {useEffect, useState} from 'react';
import {autorun} from 'mobx';

export default () => {
  const {ui} = useStores();
  const [theme, setTheme] = useState(ui.getTheme);

  useEffect(() => {
    const disposer = autorun(() => {
      setTheme(ui.getTheme);
    });

    return () => {
      disposer();
    };
  }, [ui]);

  return theme;
};

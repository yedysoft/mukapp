import {useStores} from '../stores';
import {useEffect, useState} from 'react';
import {reaction} from 'mobx';

export default () => {
  const {ui} = useStores();
  const [theme, setTheme] = useState(ui.getTheme);

  useEffect(() => {
    return reaction(
      () => ui.getTheme,
      newTheme => {
        setTheme(newTheme);
      },
    );
  }, [ui]);

  return theme;
};

import {useStores} from '../stores';
import {useEffect, useState} from 'react';
import {useServices} from '../services';

export default () => {
  const {ui} = useStores();
  const {api} = useServices();
  const [theme, setTheme] = useState(ui.getTheme);

  useEffect(() => {
    if (!api.helper.isEqual(theme, ui.getTheme)) {
      setTheme(ui.getTheme);
    }
  }, [ui.getTheme]);

  return theme;
};

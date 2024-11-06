import {useStores} from '../stores';
import {useEffect, useState} from 'react';
import {reaction} from 'mobx';
import {PopupKey} from '../types';

export default (key: PopupKey | undefined) => {
  const {ui} = useStores();
  const [visible, setVisible] = useState(key ? ui.getPopupVisible(key) : false);

  useEffect(() => {
    if (key) {
      return reaction(
        () => ui.getPopupVisible(key),
        newVisible => {
          setVisible(newVisible);
        },
      );
    }
  }, [ui, key]);

  key && console.log('usePopupVisible', key, visible);

  return visible;
};

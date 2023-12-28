import {Appearance, NativeEventSubscription} from 'react-native';
import {stores} from '../stores';

let listener: NativeEventSubscription;
const load = () => {
  const scheme = Appearance.getColorScheme();
  if (scheme) {
    stores.ui.set('systemScheme', scheme);
  }

  listener = Appearance.addChangeListener(({colorScheme}) => {
    if (colorScheme) {
      stores.ui.set('systemScheme', colorScheme);
    }
  });
};

const unload = () => {
  listener.remove();
};

export default {load: load, unload: unload};

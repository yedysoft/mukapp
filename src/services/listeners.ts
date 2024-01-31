import {Dimensions, Keyboard} from 'react-native';
import {stores} from '../stores';
import {EmitterSubscription} from 'react-native/Libraries/vendor/emitter/EventEmitter';

const listeners: EmitterSubscription[] = [];
const load = () => {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  stores.ui.setMany({window: window, screen: screen});

  listeners.push(
    Dimensions.addEventListener('change', ({window, screen}) => {
      console.log('Dimensions.addEventListener', window, screen);
      stores.ui.setMany({window: window, screen: screen});
    }),
  );

  listeners.push(
    Keyboard.addListener('keyboardDidChangeFrame', event => {
      console.log('keyboardDidChangeFrame', event);
      stores.ui.set('keyboardHeight', event.endCoordinates.height);
    }),
  );
};

const unload = () => {
  listeners.forEach(l => l.remove());
};

export default {load: load, unload: unload};

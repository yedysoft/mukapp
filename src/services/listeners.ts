import {Appearance, Dimensions, Keyboard, NativeEventSubscription, Platform} from 'react-native';
import {stores} from '../stores';
import {EmitterSubscription} from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {getLocales} from 'expo-localization';

const listeners: (EmitterSubscription | NativeEventSubscription)[] = [];
const load = () => {
  const scheme = Appearance.getColorScheme();
  const locale = getLocales()[0];
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  stores.ui.setMany({
    window: window,
    screen: screen,
    systemScheme: scheme ?? 'light',
    systemLanguage: locale.languageCode ?? 'tr',
  });

  listeners.push(
    Appearance.addChangeListener(({colorScheme}) => {
      console.log(colorScheme);
      if (colorScheme) {
        stores.ui.set('systemScheme', colorScheme);
      }
    }),
  );

  listeners.push(
    Dimensions.addEventListener('change', ({window, screen}) => {
      console.log('Dimensions.addEventListener', window, screen);
      stores.ui.setMany({window: window, screen: screen});
    }),
  );

  if (Platform.OS === 'ios') {
    listeners.push(
      Keyboard.addListener('keyboardWillShow', event => {
        console.log('keyboardWillShow', event);
        stores.ui.set('keyboardHeight', event.endCoordinates.height);
      }),
    );

    listeners.push(
      Keyboard.addListener('keyboardWillHide', event => {
        console.log('keyboardWillHide', event);
        stores.ui.set('keyboardHeight', 0);
      }),
    );
  } else {
    listeners.push(
      Keyboard.addListener('keyboardDidHide', event => {
        console.log('keyboardDidHide', event);
        stores.ui.set('keyboardHeight', 0);
      }),
    );

    listeners.push(
      Keyboard.addListener('keyboardDidShow', event => {
        console.log('keyboardDidShow', event);
        stores.ui.set('keyboardHeight', event.endCoordinates.height);
      }),
    );
  }
};

const unload = () => {
  listeners.forEach(l => l.remove());
};

export default {load: load, unload: unload};

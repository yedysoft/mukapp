import registerRootComponent from 'expo/build/launch/registerRootComponent';
import TrackPlayer from 'react-native-track-player';

import App from './App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => require('./src/playback'));
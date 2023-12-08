import {IPlayingTrack} from '../types/media';
import {IInfo} from '../types/user';
import {Positions} from '../types';

class Defaults {
  playingTrack: IPlayingTrack = {
    id: '',
    uri: '',
    name: '',
    artists: [],
    images: [],
    duration: 0,
    progress: 0,
    isPlaying: false,
    dominantColor: '',
    voteable: false,
  };

  info: IInfo = {id: null, userName: '', image: '', name: '', surname: '', coin: 0, token: 0};

  positions: Positions = {width: 0, height: 0, pageX: 0, pageY: 0};
}

const defaults = new Defaults();
export default defaults;

import {IPlayingTrack} from '../types/media';
import {IInfo} from '../types/user';

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
}

const defaults = new Defaults();
export default defaults;

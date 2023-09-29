import {BaseStore} from './base';
import {IPlayingTrack} from '../types/media';

export class MediaStore extends BaseStore<MediaStore> {
  playingTrack: IPlayingTrack = {id: '', uri: '', name: '', artists: [], images: [], duration: 0, progress: 0, isPlaying: false};

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MediaStore.name, []);
  }

  get getPlayingTrack() {
    return this.playingTrack;
  }
}

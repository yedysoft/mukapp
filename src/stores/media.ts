import {BaseStore} from './base';
import {IPlaylist, IQueueTrack} from '../types/media';
import defaults from '../utils/defaults';
import {computed} from 'mobx';

class MediaStore extends BaseStore<MediaStore> {
  playingTrack = defaults.playingTrack;
  queue: IQueueTrack[] = [];
  playlists: IPlaylist[] = [];
  searchValue = '';

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MediaStore.name);
  }

  get getDominantColor() {
    return computed(() => this.playingTrack.dominantColor).get();
  }

  get getVoteable() {
    return computed(() => this.playingTrack.voteable).get();
  }
}

const media = new MediaStore();
export default media;

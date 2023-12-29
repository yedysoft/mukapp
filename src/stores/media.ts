import {BaseStore} from './base';
import {IPlaylist, IQueueTrack} from '../types/media';
import defaults from '../utils/defaults';

export class MediaStore extends BaseStore<MediaStore> {
  authenticated = true;
  playingTrack = defaults.playingTrack;
  queue: IQueueTrack[] = [];
  playlists: IPlaylist[] = [];
  searchValue = '';

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MediaStore.name, []);
  }

  get getAuthenticated() {
    return this.authenticated;
  }

  get getPlayingTrack() {
    return this.playingTrack;
  }

  get getQueue() {
    return this.queue;
  }

  get getPlaylists() {
    return this.playlists;
  }

  get getSearchValue() {
    return this.searchValue;
  }
}

const media = new MediaStore();
export default media;

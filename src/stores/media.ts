import {BaseStore} from './base';
import {IPlaylist, IQueueTrack} from '../types/media';
import defaults from '../utils/defaults';
import {computed} from 'mobx';

class MediaStore extends BaseStore<MediaStore> {
  authenticated = true;
  spotifyPremiumNeeded = false;
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

  get getDominantColor() {
    return computed(() => this.playingTrack.dominantColor).get();
  }

  get getVoteable() {
    return computed(() => this.playingTrack.voteable).get();
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

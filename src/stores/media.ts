import {BaseStore} from './base';
import {IPlayingTrack, IPlaylist, IQueueTrack} from '../types/media';

export class MediaStore extends BaseStore<MediaStore> {
  playingTrack: IPlayingTrack = {id: '', uri: '', name: '', artists: [], images: [], duration: 0, progress: 0, isPlaying: false, palette: []};
  queue: IQueueTrack[] = [];
  playlists: IPlaylist[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MediaStore.name, []);
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
}

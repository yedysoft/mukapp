import {BaseStore} from './base';

export class LoadingStore extends BaseStore<LoadingStore> {
  login = false;
  userPlaylist = false;
  playlistTracks = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, LoadingStore.name, []);
  }

  get getLogin() {
    return this.login;
  }

  get getUserPlaylist() {
    return this.playlistTracks;
  }

  get getPlaylistTracks() {
    return this.playlistTracks;
  }
}

const loading = new LoadingStore();
export default loading;

import {BaseStore} from './base';

class LoadingStore extends BaseStore<LoadingStore> {
  // Auth
  login = false;
  logout = false;
  register = false;
  forgotPass = false;
  clearAuth = false;
  passChange = false;
  connectAccount = false;

  // Media
  userPlaylist = false;
  playlistTracks = false;

  // Room
  leaderboard = false;
  roomList = false;
  createRoom = false;

  // Profile
  votes = false;
  followers = false;
  following = false;
  editInfo = false;
  deleteImage = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, LoadingStore.name);
  }
}

const loading = new LoadingStore();
export default loading;

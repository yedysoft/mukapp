import {BaseStore} from './base';

class LoadingStore extends BaseStore<LoadingStore> {
  // Auth
  login = false;
  logout = false;
  register = false;
  forgotPass = false;

  // Media
  userPlaylist = false;
  playlistTracks = false;

  // Room
  leaderboard = false;

  // Profile
  votes = false;
  followers = false;
  following = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, LoadingStore.name, []);
  }

  get getLogin() {
    return this.login;
  }

  get getLogout() {
    return this.logout;
  }

  get getRegister() {
    return this.register;
  }

  get getForgotPass() {
    return this.forgotPass;
  }

  get getUserPlaylist() {
    return this.userPlaylist;
  }

  get getPlaylistTracks() {
    return this.playlistTracks;
  }

  get getLeaderboard() {
    return this.leaderboard;
  }

  get getVotes() {
    return this.votes;
  }

  get getFollowers() {
    return this.followers;
  }

  get getFollowing() {
    return this.following;
  }
}

const loading = new LoadingStore();
export default loading;

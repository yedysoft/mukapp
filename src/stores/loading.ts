import {BaseStore} from './base';

export class LoadingStore extends BaseStore<LoadingStore> {
  login = false;

  constructor() {
    super();
    this.makeObservableAndPersistable(this, LoadingStore.name, []);
  }

  get getLogin() {
    return this.login;
  }
}

const loading = new LoadingStore();
export default loading;

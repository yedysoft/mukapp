import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {IUserInfo} from '../types/auth';

export class AuthStore implements IStore {
  loggedIn = false;
  authToken: string | null = null;
  user: IUserInfo = {id: '-1', coin: 0};

  get isLoggedIn() {
    return this.loggedIn;
  }

  get getAuthToken() {
    return this.authToken;
  }

  get getUser() {
    return this.user;
  }

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: AuthStore.name,
      properties: ['authToken'],
    })
      .then(() => {
        console.log(AuthStore.name + ' verileri başarıyla geri yüklendi.');
      })
      .catch(error => {
        console.error(AuthStore.name + ' verileri geri yükleme sırasında hata oluştu:', error);
      });
  }

  set<T extends StoreKeysOf<AuthStore>>(what: T, value: AuthStore[T]) {
    (this as AuthStore)[what] = value;
  }

  setMany<T extends StoreKeysOf<AuthStore>>(obj: Record<T, AuthStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as AuthStore[T]);
    }
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}

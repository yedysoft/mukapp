import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {Appearance, Language} from '../types/enums';

export class UIStore implements IStore {
  appearance: Appearance = 'system';
  language: Language = 'system';
  progress = 0;

  get isAppearanceSystem() {
    return this.appearance === 'system';
  }

  get isLanguageSystem() {
    return this.language === 'system';
  }

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: UIStore.name,
      properties: ['appearance', 'language'],
    })
      .then(() => {
        console.log(UIStore.name + ' verileri başarıyla geri yüklendi.');
      })
      .catch(error => {
        console.error(UIStore.name + ' verileri geri yükleme sırasında hata oluştu:', error);
      });
  }

  set<T extends StoreKeysOf<UIStore>>(what: T, value: UIStore[T]) {
    (this as UIStore)[what] = value;
  }

  setMany<T extends StoreKeysOf<UIStore>>(obj: Record<T, UIStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as UIStore[T]);
    }
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}

import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {makeObservable, observable} from 'mobx';

export class BaseStore<T extends Record<string, any>> {
  protected makeObservableAndPersistable(o: any, name: string, persistProps: (keyof T)[]) {
    const props: Record<string, any> = {};
    const observableProps = Object.keys(o);
    for (const property of observableProps) {
      props[property] = observable;
    }
    makeObservable(o, props);

    makePersistable(o, {
      name: name,
      properties: persistProps as (keyof T)[],
    })
      .then(() => {
        console.log(name + ' verileri başarıyla geri yüklendi.');
      })
      .catch(error => {
        console.error(name + ' verileri geri yükleme sırasında hata oluştu:', error);
      });
  }

  set<K extends keyof T>(what: K, value: T[K]) {
    (this as unknown as T)[what] = value;
  }

  setMany(obj: Partial<T>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as keyof T, v as T[keyof T]);
    }
  }

  async hydrate(): Promise<void> {
    await hydrateStore(this);
  }
}
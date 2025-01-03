import {makePersistable} from 'mobx-persist-store';
import {makeObservable, observable, runInAction} from 'mobx';

export class BaseStore<T extends Record<string, any>> {
  protected makeObservableAndPersistable(
    o: any,
    name: string,
    persistProps: (keyof T)[] = [],
    notObservableProps: (keyof T)[] = [],
  ) {
    const props: Record<string, any> = {};
    const observableProps = Object.keys(o);
    for (const property of observableProps) {
      if (!notObservableProps.includes(property)) {
        props[property] = observable;
      }
    }
    makeObservable(o, props);

    if (persistProps) {
      makePersistable(o, {
        name: name,
        properties: persistProps as (keyof T)[],
      })
        .then(() => console.log(name + ' verileri başarıyla geri yüklendi.'))
        .catch(error => console.error(name + ' verileri geri yükleme sırasında hata oluştu:', error));
    }
  }

  set<K extends keyof T>(what: K, value: T[K] | ((v: T[K]) => T[K])) {
    runInAction(() => {
      if (typeof value === 'function') {
        const valueFunction = value as (v: T[K]) => T[K];
        (this as unknown as T)[what] = valueFunction((this as unknown as T)[what]);
      } else {
        (this as unknown as T)[what] = value;
      }
    });
  }

  setMany(obj: {[K in keyof T]?: T[K] | ((v: T[K]) => T[K])}) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as keyof T, v as T[keyof T] | ((v: T[keyof T]) => T[keyof T]));
    }
  }
}

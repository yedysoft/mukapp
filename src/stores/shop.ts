import {BaseStore} from './base';
import {IProduct} from '../types/shop';

class ShopStore extends BaseStore<ShopStore> {
  coins: IProduct[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, ShopStore.name);
  }
}

const shop = new ShopStore();
export default shop;

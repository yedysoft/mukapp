import {stores} from '../../stores';
import {PVoid} from '../../types';
import * as RNI from 'react-native-iap';

class ShopApi {
  coinSkus: {[key: string]; any} = {
    mukcoin10: {value: 10, source: require('../../../assets/shop/coin1.png')},
    mukcoin50: {value: 50, source: require('../../../assets/shop/coin2.png')},
    mukcoin100: {value: 100, source: require('../../../assets/shop/coin3.png')},
    mukcoin500: {value: 500, source: require('../../../assets/shop/coin4.png')},
    mukcoin1000: {value: 1000, source: require('../../../assets/shop/coin5.png')},
    mukcoin2500: {value: 2500, source: require('../../../assets/shop/coin6.png')},
    mukcoin5000: {value: 5000, source: require('../../../assets/shop/coin7.png')},
  };

  initConnection = async (): PVoid => {
    try {
      await RNI.initConnection();
    } catch (e) {
      console.log(e);
    }
  };

  endConnection = async (): PVoid => {
    try {
      await RNI.endConnection();
    } catch (e) {
      console.log(e);
    }
  };

  requestPurchase = async (sku: string): PVoid => {
    try {
      await RNI.requestPurchase({sku});
    } catch (e) {
      console.log(e);
    }
  };

  getCoinProducts = async (): PVoid => {
    try {
      const products = await RNI.getProducts({skus: Object.keys(this.coinSkus)});
      stores.shop.set(
        'coins',
        products.map(p => ({...p, ...this.coinSkus[p.productId]})),
      );
    } catch (e) {
      console.log(e);
    }
  };
}

const shop = new ShopApi();
export default shop;

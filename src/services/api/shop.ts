import * as RNI from 'react-native-iap';
import {ProductPurchase} from 'react-native-iap';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {Platform} from 'react-native';

class ShopApi {
  coinSkus: Record<string, {value: number; source: number}> = {
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
      console.log('initConnection', await RNI.initConnection());
    } catch (e) {
      console.log(e);
    }
  };

  endConnection = async (): PVoid => {
    try {
      console.log('endConnection', await RNI.endConnection());
    } catch (e) {
      console.log(e);
    }
  };

  requestPurchase = async (sku: string): PVoid => {
    try {
      const args = Platform.OS === 'ios' ? {sku} : {skus: [sku]};
      const response = (await RNI.requestPurchase(args)) as ProductPurchase | ProductPurchase[];
      const purchase = Array.isArray(response) ? response[0] : response;
      console.log('requestPurchase', purchase);
    } catch (e) {
      console.log(e);
    }
  };

  getCoinProducts = async (): PVoid => {
    try {
      const products = await RNI.getProducts({skus: Object.keys(this.coinSkus)});
      console.log('products', products);
      const values = products.map(p => ({...p, ...this.coinSkus[p.productId]})).sort((a, b) => a.value - b.value);
      stores.shop.set('coins', values);
    } catch (e) {
      console.log(e);
    }
  };
}

const shop = new ShopApi();
export default shop;

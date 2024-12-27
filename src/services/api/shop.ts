import * as RNI from 'react-native-iap';
import {ProductPurchase, Purchase} from 'react-native-iap';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import {Platform} from 'react-native';
import axiosIns from '../axiosIns';
import {IPurchase} from '../../types/shop';
import {IOperatingSystemType} from '../../types/enums';

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
      await RNI.initConnection();
      await this.checkNonCompletedPurchases();
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

  checkNonCompletedPurchases = async (): PVoid => {
    try {
      const purchases = await RNI.getAvailablePurchases();
      for (const purchase of purchases) {
        await this.processPurchase(purchase);
      }
    } catch (e) {
      console.log(e);
    }
  };

  processPurchase = async (data: Purchase): PVoid => {
    try {
      const price = stores.shop.coins.find(v => v.productId === data.productId)?.price;
      const purchase: IPurchase = {
        type: 'PRODUCT',
        operatingSystem: Platform.OS.toUpperCase() as IOperatingSystemType,
        transactionId: data.transactionId,
        transactionDate: new Date(data.transactionDate).toISOString(),
        purchaseToken: data.purchaseToken,
        productId: data.productId,
        regionCode: await RNI.getStorefront(),
        price: price ? parseFloat(price) : undefined,
      };
      const response = await axiosIns.post<boolean>('/purchase/processPurchase', purchase);
      if (response.status === 200) {
        if (response.data) {
          console.log(
            'finishTransaction',
            await RNI.finishTransaction({
              purchase: data,
              isConsumable: true,
              developerPayloadAndroid: data.developerPayloadAndroid,
            }),
          );
          stores.ui.addInfo('Satın alma işlemi doğrulandı.');
        } else {
          stores.ui.addError('Satın alma işlemi doğrulanamadı. Uygulama başlangıcında tekrar denenecek.');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  requestPurchase = async (sku: string): PVoid => {
    try {
      const args = Platform.OS === 'ios' ? {sku} : {skus: [sku]};
      const result = (await RNI.requestPurchase(args)) as ProductPurchase | ProductPurchase[];
      stores.loading.set('processPurchase', true);
      const data = Array.isArray(result) ? result[0] : result;
      //await this.processPurchase(data);
      console.log('requestPurchase', data);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('processPurchase', false);
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

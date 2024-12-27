import {Product} from 'react-native-iap';
import {IOperatingSystemType, IPurchaseType} from './enums';

export type IProduct = Product & {
  source: number;
  value: number;
};

export type IPurchase = {
  type: IPurchaseType;
  operatingSystem: IOperatingSystemType;
  transactionId?: string;
  transactionDate: string;
  purchaseToken?: string;
  productId: string;
  regionCode: string;
  price?: number;
};

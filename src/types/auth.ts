import {IAuthsType, IDeviceType, IGender} from './enums';

export type ILogin = {
  name: string;
  pass: string;
};

export type IForgot = {
  name: string;
};

export type IRegister = {
  name: string;
  email: string;
  userName: string;
  userPass: string;
};

export type IEdit = {
  name: string;
  birthday: string | null;
  gender: IGender | null;
};

export type ILoginHistory = {
  ipAddress: string | null;
  deviceType: IDeviceType;
  deviceBrand: string | null;
  deviceModel: string | null;
  operatingSystem: string;
};

export type IPassChange = {
  oldPass: string;
  newPass: string;
};

export type IAuths = {
  accountId: string;
  type: IAuthsType;
};

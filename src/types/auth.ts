import {IGender} from './enums';

export type ILogin = {
  name: string;
  pass: string;
  expoToken: string | null;
};

export type IForgot = {
  email: string;
};

export type IRegister = {
  userName: string;
  email: string;
  userPass: string;
  name?: string;
  surname?: string;
  birthday?: string;
  gender?: IGender;
  telNumber?: string;
};

export type IEdit = {
  userName: string;
  email: string;
  userPass: string;
  name?: string;
  surname?: string;
  birthday?: string;
  gender?: IGender;
  telNumber?: string;
};

import {Gender} from './enums';

export type ILogin = {
  name: string;
  pass: string;
  expoToken: string;
};

export type IForgot = {
  name: string;
};

export type IRegister = {
  userName: string;
  email: string;
  userPass: string;
  name?: string;
  surname?: string;
  birthday?: string;
  gender?: Gender;
  telNumber?: string;
};

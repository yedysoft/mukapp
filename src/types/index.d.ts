import {ThemeBase} from 'react-native-paper/lib/typescript/types';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {MainStackScreens} from '../navigation/MainStack';
import {IAuthsType, IMessageBodyType} from './enums';
import {Fonts} from 'react-native-paper/src/types';
import {IForgot, ILogin, IRegister} from './auth';

// Services
export interface IAuthApi {
  forgotPass(form: IForgot): PVoid;
  register(form: IRegister): PVoid;
  login(form: ILogin): PVoid;
  logout(): PVoid;
  checkToken(): PVoid;
  isNeededPassChange(): Promise<boolean>;
  saveLoginHistory(): PVoid;
}
export interface IAuthsApi {
  clearAuth(type: IAuthsType): PVoid;
  getAuths(): PVoid;
  connectAccount(key: IAuthsType, name: string, isLogin?: boolean): PVoid;
}
export interface IService {
  init: () => PVoid;
}

// Language
type LangError<T> = {
  required: T;
  notValidInputs: T;
  soon: T;
};
type LangHeader<T> = {
  blank: T;
};
type LangAuth<T> = {
  login: {
    title: T;
    username: T;
    password: T;
    changePassword: T;
    toRegister: T;
    submit: T;
    spotify: T;
  };
  register: {
    title: T;
    name: T;
    birthday: T;
    gender: T;
    email: T;
    username: T;
    phone: T;
    password: T;
    repassword: T;
    next: T;
    prev: T;
    toLogin: T;
    submit: T;
  };
  forgot: {
    title: T;
    email: T;
    back: T;
    submit: T;
  };
  edit: {
    submit: T;
  };
};
type LangMain<T> = {
  room: {
    blank: T;
  };
  social: {
    newChat: T;
    typing: T;
  };
  home: {
    places: T;
    streamers: T;
  };
  notifications: {
    blank: T;
  };
  premium: {
    blank: T;
  };
  profile: {
    votes: T;
    followers: T;
    following: T;
  };
  shop: {
    blank: T;
  };
  side: {
    profile: T;
    notifications: T;
    search: T;
    premium: T;
    tasks: T;
    settings: T;
    ps: T;
  };
  search: {
    placeholder: T;
    follows: T;
  };
  task: {
    blank: T;
  };
  settings: {
    title: T;
    theme: {
      title: T;
      system: T;
      light: T;
      dark: T;
    };
    language: {
      title: T;
      system: T;
    };
    connect: {
      title: T;
      spotify: {
        connect: T;
        disconnect: T;
      };
    };
  };
  ps: {
    blocked: T;
  };
};
type LangRoomConfig<T> = {
  name: T;
  submit: T;
};
type LangNotification<T> = {
  accept: T;
  reject: T;
};
type LangDialogContent<T> = {
  title: T;
  content: T;
  reject: T;
  accept: T;
};
type LangDialog<T> = {
  default: LangDialogContent<T>;
  spotify: LangDialogContent<T>;
  spotifyPremium: LangDialogContent<T>;
};
type LangEnum<T> = {
  gender: {
    MALE: T;
    FEMALE: T;
    OTHER: T;
  };
};
type LangForm<T> = {
  newPass: {
    title: T;
    newPass: T;
    reNewPass: T;
    submit: T;
  };
};
export type MukLang = {
  error: LangError<string>;
  header: LangHeader<string>;
  auth: LangAuth<string>;
  main: LangMain<string>;
  roomConfig: LangRoomConfig<string>;
  notification: LangNotification<string>;
  dialog: LangDialog<string>;
  enum: LangEnum<string>;
  form: LangForm<string>;
};
type LangPaths<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string ? LangPaths<T[K], `${P}${P extends '' ? '' : '.'}${K}`> : never;
    }[keyof T]
  : P;
export type MukLangPaths = LangPaths<MukLang>;

// System
export type MukColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  error: string;
  warning: string;
  info: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  backdrop: string;
  bubble: string;
  text: string;
  light: string;
  dark: string;
  dialog: string;
};
export type MukTheme = ThemeBase & {
  version: 2;
  isV3: false;
  colors: MukColors;
  fonts: Fonts;
};
export type MukMenu = {
  icon: IconSource;
  label: string;
  route: keyof MainStackScreens;
  params?: any;
  disabled?: boolean;
};
export type PVoid = Promise<void>;
export type PureFunc = () => void;

// Components
export type ModalScreenProps = {
  visible: boolean;
  changeVisible: (open: boolean) => void;
  data?: any;
};
export type Positions = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
  right: number;
  bottom: number;
};
export type TooltipScreenProps = ModalScreenProps & {
  positions: Positions;
};

// Message
export type MukMessage = {
  id: number;
  interval: number;
  body: MessageBody;
};
export type MessageBody = {
  code: number;
  message: string;
  type: IMessageBodyType;
  data?: any;
};

// Global
export type IPage<T> = {
  content: T;
  pageable: IPageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
type IPageable = {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};
type ISort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

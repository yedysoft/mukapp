import {MD3Typescale, ThemeBase} from 'react-native-paper/lib/typescript/types';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {MainStackScreens} from '../navigation/MainStack';

// Services
export interface IService {
  init: () => PVoid;
}

// Language
export type LangError<T> = {
  required: T;
  notValidInputs: T;
  soon: T;
};
export type LangHeader<T> = {
  blank: T;
};
export type LangAuth<T> = {
  login: {
    title: T;
    username: T;
    password: T;
    changePassword: T;
    toRegister: T;
    submit: T;
  };
  register: {
    title: T;
    name: T;
    surname: T;
    birthday: T;
    gender: T;
    genders: {
      male: T;
      female: T;
      other: T;
    };
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
};
export type LangMain<T> = {
  room: {
    blank: T;
  };
  social: {
    blank: T;
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
      tr: T;
      en: T;
    };
  };
};
export type LangRoomConfig<T> = {
  name: T;
  submit: T;
  placeholder: T;
};
export type MukLang = {
  error: LangError<string>;
  header: LangHeader<string>;
  auth: LangAuth<string>;
  main: LangMain<string>;
  roomConfig: LangRoomConfig<string>;
};

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
  text: string;
};
export type MukTheme = ThemeBase & {
  version: 3;
  isV3: true;
  colors: MukColors;
  fonts: MD3Typescale;
};
export type MukMenu = {
  icon: IconSource;
  label: string;
  route: keyof MainStackScreens;
  disabled?: boolean;
};
export type PVoid = Promise<void>;
export type PureFunc = () => void;

// Components
export type Positions = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};
export type TooltipScreenProps = {
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
};

// Message
export type MukMessage = {
  id: number;
  body: MessageBody;
};
export type MessageBody = {
  code: number;
  message: string;
  type: 'error' | 'warning' | 'info';
};

import {MD3Typescale, ThemeBase} from 'react-native-paper/lib/typescript/types';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {MainStackScreens} from '../navigation/MainStack';

// Services
export interface IService {
  init: () => PVoid;
}

// Language
export type LangError = {
  required: string;
  notValidInputs: string;
};
export type LangHeader = {
  blank: any;
};
export type LangAuth = {
  login: {
    title: string;
    username: string;
    password: string;
    changePassword: string;
    toRegister: string;
    submit: string;
  };
  register: {
    title: string;
    name: string;
    surname: string;
    birthday: string;
    gender: string;
    genders: {
      male: string;
      female: string;
      other: string;
    };
    email: string;
    username: string;
    phone: string;
    password: string;
    repassword: string;
    next: string;
    prev: string;
    toLogin: string;
    submit: string;
  };
  forgot: {
    title: string;
    email: string;
    back: string;
    submit: string;
  };
};
export type LangMain = {
  room: {
    blank: string;
  };
  social: {
    blank: string;
  };
  home: {
    places: string;
    streamers: string;
  };
  notifications: {
    blank: string;
  };
  premium: {
    blank: string;
  };
  profile: {
    votes: string;
    followers: string;
    following: string;
  };
  shop: {
    blank: string;
  };
  side: {
    profile: string;
    notifications: string;
    search: string;
    premium: string;
    tasks: string;
    settings: string;
  };
  search: {
    placeholder: string;
  };
  task: {
    blank: string;
  };
};
export type LangRoomConfig = {
  name: string;
  submit: string;
};
export type MukLang = {
  error: LangError;
  header: LangHeader;
  auth: LangAuth;
  main: LangMain;
  roomConfig: LangRoomConfig;
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
  x: number;
  y: number;
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

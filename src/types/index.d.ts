// Services
export interface IService {
  init: () => PVoid;
}

// Language
export type LangError = {
  notEmpty: string;
};
export type LangAuth = {
  title: string;
  subTitle: string;
  user: string;
  pass: string;
  login: string;
};
export type LangHome = {
  places: string;
  streamers: string;
};
export type LangRoomConfig = {
  name: string;
  createRoom: string;
};
export type MukLang = {
  error: LangError;
  auth: LangAuth;
  home: LangHome;
  roomConfig: LangRoomConfig;
};

// System
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

// Error
export type ErrorMessage = {
  id: number;
  error: ErrorBody;
};
export type ErrorBody = {
  code: number;
  message: string;
};

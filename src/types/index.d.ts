// `services` layer
interface IService {
  init: () => PVoid;
}

// Language
type LangError = {
  notEmpty: string;
};
type LangAuth = {
  title: string;
  subTitle: string;
  user: string;
  pass: string;
  login: string;
};
type LangHome = {
  places: string;
  streamers: string;
};
type LangRoomConfig = {
  name: string;
  createRoom: string;
};
type MukLang = {
  error: LangError;
  auth: LangAuth;
  home: LangHome;
  roomConfig: LangRoomConfig;
};

// System
type PVoid = Promise<void>;
type PureFunc = () => void;

// Design system
type ThemeColors = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  bg2Color: string;
};

type TooltipScreenProps = {
  visible: boolean;
  changeVisible: (open: boolean) => void;
};

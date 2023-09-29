// `services` layer

interface IService {
  init: () => PVoid;
}

// Language
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
type MukLang = {
  auth: LangAuth;
  home: LangHome;
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

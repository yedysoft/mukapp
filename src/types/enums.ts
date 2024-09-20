export const _languages = {
  system: 'System',
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  ar: 'عربي',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
};
export type ILanguage = keyof typeof _languages;

export const _appearances = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};
export type IAppearance = keyof typeof _appearances;

export type IChatType = 'PRIVATE' | 'GROUP';
export type IContentType = 'TEXT' | 'PICTURE' | 'VIDEO' | 'LINK' | 'FILE';
export type IMessageType = 'PUBLIC' | 'PRIVATE' | 'GROUP' | 'TYPING';
export type IUserAuthority = 'ADMIN' | 'USER';
export type INotificationType = 'DEFAULT' | 'FOLLOW' | 'MESSAGE';
export type IMessageBodyType = 'ERROR' | 'WARNING' | 'INFO';

export const _gender = ['MALE', 'FEMALE', 'OTHER'] as const;
export type IGender = (typeof _gender)[number];

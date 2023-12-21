export const _languages = {
  system: 'System',
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
};
export type ILanguage = keyof typeof _languages;

export const _appearances = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};
export type IAppearance = keyof typeof _appearances;

export type IChatType = 'Private' | 'Group';
export type IContentType = 'Text' | 'Picture' | 'Video' | 'Link' | 'File';
export type IMessageType = 'Public' | 'Private' | 'Group';
export type IUserAuthority = 'Admin' | 'User';
export type IGender = 'Male' | 'Female' | 'Other';

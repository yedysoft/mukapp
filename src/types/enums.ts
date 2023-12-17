export const _languages = {
  system: 'System',
  tr: 'Türkçe',
  en: 'English',
};
export type ILanguage = keyof typeof _languages;

export const _appearances = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};
export type IAppearance = keyof typeof _appearances;

export enum IGender {
  Male = 0,
  Female = 1,
  Other = 2,
}

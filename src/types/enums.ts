const _languages = {
  system: 'System',
  tr: 'TR',
  en: 'EN',
} as const;
export type Language = keyof typeof _languages;

const _appearances = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;
export type Appearance = keyof typeof _appearances;

export enum MessageType {
  Public = 0,
  Private = 1,
  Group = 2,
}

export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}

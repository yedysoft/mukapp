import {MukTheme} from '../types';

const LightTheme: MukTheme = {
  colors: {
    primary: '#48D904',
    secondary: '#041014',
    tertiary: 'rgba(255, 55, 95, 1)',
    background: '#ffffff',
    error: 'rgba(255, 69, 58, 1)',
    warning: 'rgba(255, 159, 10, 1)',
    info: 'rgba(10, 132, 255, 1)',
    outline: 'rgba(209, 209, 214, 1)',
    outlineVariant: 'rgb(61,61,77)',
    shadow: 'rgba(80,80,80,0.1)',
    backdrop: 'rgba(44, 44, 46, .1)',
    bubble: 'rgb(225,225,225)',
    text: 'rgba(242, 242, 247, 1)',
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(0, 0, 0, 1)',
    dialog: '#eeeeee',
  },
};

const DarkTheme: MukTheme = {
  colors: {
    primary: '#48D904',
    secondary: '#ffffff',
    tertiary: 'rgba(255, 55, 95, 1)',
    background: '#04161E',
    error: '#B91C1C',
    warning: '#F27D16',
    info: '#0477BF',
    outline: 'rgba(209, 209, 214, 1)',
    outlineVariant: 'rgba(174, 174, 178, 1)',
    shadow: 'rgba(142, 142, 147, .1)',
    backdrop: 'rgba(44, 44, 46, .1)',
    bubble: '#083b47',
    text: 'rgba(242, 242, 247, 1)',
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(0, 0, 0, 1)',
    dialog: '#051517',
  },
};

const themes = {light: LightTheme, dark: DarkTheme};
export default themes;

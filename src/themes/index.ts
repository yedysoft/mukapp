import {adaptNavigationTheme, MD2DarkTheme, MD2LightTheme} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme} from '@react-navigation/native';
import {MukTheme} from '../types';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme: MukTheme = {
  ...MD2LightTheme,
  ...LightTheme,
  colors: {
    ...MD2LightTheme.colors,
    ...LightTheme.colors,
    primary: '#1ABC4C',
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
    bubble: 'rgba(54, 54, 54, 1)',
    text: 'rgba(242, 242, 247, 1)',
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(0, 0, 0, 1)',
  },
};

const CombinedDarkTheme: MukTheme = {
  ...MD2DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD2DarkTheme.colors,
    ...DarkTheme.colors,
    primary: '#1ABC4C',
    secondary: '#ffffff',
    tertiary: 'rgba(255, 55, 95, 1)',
    background: '#041014',
    error: 'rgba(255, 69, 58, 1)',
    warning: 'rgba(255, 159, 10, 1)',
    info: 'rgba(10, 132, 255, 1)',
    outline: 'rgba(209, 209, 214, 1)',
    outlineVariant: 'rgba(174, 174, 178, 1)',
    shadow: 'rgba(142, 142, 147, .1)',
    backdrop: 'rgba(44, 44, 46, .1)',
    bubble: 'rgba(54, 54, 54, 1)',
    text: 'rgba(242, 242, 247, 1)',
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(0, 0, 0, 1)',
  },
};

const themes = {light: CombinedLightTheme, dark: CombinedDarkTheme};
export default themes;

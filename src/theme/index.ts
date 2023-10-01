import {adaptNavigationTheme, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: '#6FEE71',
    secondary: '#041014',
    tertiary: 'rgba(255, 55, 95, 1)',
    background: '#ffffff',
    error: 'rgba(255, 69, 58, 1)',
    outline: 'rgba(209, 209, 214, 1)',
    outlineVariant: 'rgba(174, 174, 178, 1)',
    shadow: 'rgba(142, 142, 147, 1)',
    backdrop: 'rgba(44, 44, 46, .1)',
  },
};

export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: '#6FEE71',
    secondary: '#ffffff',
    tertiary: 'rgba(255, 55, 95, 1)',
    background: '#041014',
    error: 'rgba(255, 69, 58, 1)',
    outline: 'rgba(209, 209, 214, 1)',
    outlineVariant: 'rgba(174, 174, 178, 1)',
    shadow: 'rgba(142, 142, 147, 1)',
    backdrop: 'rgba(44, 44, 46, .1)',
  },
};

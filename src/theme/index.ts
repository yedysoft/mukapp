import {adaptNavigationTheme, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    background: '#041014',
    primary: '#6FEE71',
    button: 'rgba(51, 48, 228, 1)',
    secondary: 'rgba(75, 61, 96, 1)',
    text: 'rgba(255, 255, 255, 1)',
    black: 'rgba(0, 0, 0, 1)',
    white: 'rgba(255, 255, 255, 1)',
    grey: 'rgba(255, 255, 255, .2)',
    red: 'rgba(255, 30, 30, 1)',
    orange: 'rgba(253, 94, 83, 1)',
    yellow: 'rgba(255, 227, 115, 1)',
    light: {
      grey: 'rgba(204, 206, 213, 1)',
      orange: 'rgba(252, 156, 84, 1)',
    },
  },
};

export const CombinedTheme = CombinedDarkTheme;

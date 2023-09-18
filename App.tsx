import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {CombinedTheme} from './theme';
import {PaperProvider} from 'react-native-paper';
import AppNavigation from './navigation/AppNavigation';

export default function App() {
  return (
    <PaperProvider theme={CombinedTheme}>
      <StatusBar style="auto"/>
      <AppNavigation/>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});

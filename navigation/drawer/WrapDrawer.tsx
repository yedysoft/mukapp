import {createDrawerNavigator} from '@react-navigation/drawer';
import MainWrapper from './MainWrapper';
import MukDrawer from './MukDrawer';
import {useTheme} from 'react-native-paper';

const Wrap = createDrawerNavigator();

export default function WrapDrawer() {
  const theme = useTheme()

  return (
    <Wrap.Navigator
      backBehavior="none"
      initialRouteName="Wrapper"
      screenOptions={{
        overlayColor: 'transparent',
        drawerType: 'slide',
        drawerStyle: {},
        drawerContentContainerStyle: {},
        sceneContainerStyle: {backgroundColor: theme.colors.primary},
      }}
      drawerContent={() => <MukDrawer />}
    >
      <Wrap.Screen name="Wrapper" component={MainWrapper} options={{headerShown: false}}/>
    </Wrap.Navigator>
  );
}

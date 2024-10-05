import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import ShopScreen from '../screens/main/ShopScreen';
import {responsiveHeight} from '../utils/util';
import HomeScreen from '../screens/main/HomeScreen';
import {MukTheme} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import MessagesScreen from '../screens/main/social/MessagesScreen';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import * as NavigationBar from 'expo-navigation-bar';
import {Platform} from 'react-native';
import {NavigationBarButtonStyle} from 'expo-navigation-bar/src/NavigationBar.types';
import useDominantColor from '../hooks/useDominantColor';
import {YedyPalette} from '../themes/YedyPalette';

const Bottom = createBottomTabNavigator();
export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const keyboardVisible = ui.isKeyboardVisible;
  const {isLive, dominantColor, isColorLight} = useDominantColor();
  const style: NavigationBarButtonStyle = isColorLight ? 'dark' : 'light';

  const getIconColor = (focused: boolean) => {
    if (focused) {
      return isLive && isColorLight ? YedyPalette.green_dark : colors.primary;
    }
    return isLive ? (isColorLight ? colors.dark : colors.light) : colors.outlineVariant;
  };

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(dominantColor).then(
      async () => await NavigationBar.setButtonStyleAsync(style),
    );
  }

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          display: keyboardVisible ? 'none' : undefined,
          height: responsiveHeight(80),
          backgroundColor: isLive ? dominantColor : colors.background,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => <Feather name="shopping-bag" size={30} color={getIconColor(focused)} />,
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Shop'}),
        })}
      />
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <Feather name="grid" size={30} color={getIconColor(focused)} />,
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Home'}),
          beforeRemove: a => console.log(a),
        })}
      />
      <Bottom.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => <Feather name="message-circle" size={30} color={getIconColor(focused)} />,
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Messages'}),
        })}
      />
    </Bottom.Navigator>
  );
});

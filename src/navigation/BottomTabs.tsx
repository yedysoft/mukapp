import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import ShopScreen from '../screens/main/ShopScreen';
import {responsiveHeight, responsiveSize} from '../utils/util';
import HomeScreen from '../screens/main/HomeScreen';
import {MukTheme} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import MessagesScreen from '../screens/main/social/MessagesScreen';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import * as NavigationBar from 'expo-navigation-bar';
import {Platform} from 'react-native';
import {NavigationBarButtonStyle} from 'expo-navigation-bar/src/NavigationBar.types';
import {YedyPalette} from '../themes/YedyPalette';
import {useServices} from '../services';

const Bottom = createBottomTabNavigator();
export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui, room, media} = useStores();
  const {api} = useServices();
  const keyboardVisible = ui.isKeyboardVisible;
  const dominantColor = media.getDominantColor ?? colors.background;
  const barColor = room.isLive && !room.isRoomPageOn ? dominantColor : colors.background;
  const isColorLight = api.helper.isColorLight(barColor);
  const style: NavigationBarButtonStyle = isColorLight ? 'dark' : 'light';

  const getIconColor = (focused: boolean) => {
    if (focused) {
      return room.isLive && isColorLight ? YedyPalette.green_dark : colors.primary;
    }
    return room.isLive ? (isColorLight ? colors.dark : colors.light) : colors.outlineVariant;
  };

  if (Platform.OS === 'android') {
    NavigationBar.getBackgroundColorAsync().then(async value => {
      if (value !== barColor) {
        await NavigationBar.setBackgroundColorAsync(barColor);
        await NavigationBar.setButtonStyleAsync(style);
      }
    });
  }

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          display: keyboardVisible ? 'none' : undefined,
          height: responsiveHeight(80),
          backgroundColor: barColor,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather name="shopping-bag" size={responsiveSize(40)} color={getIconColor(focused)} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Shop'}),
        })}
      />
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <Feather name="grid" size={responsiveSize(40)} color={getIconColor(focused)} />,
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
          tabBarIcon: ({focused}) => (
            <Feather name="message-circle" size={responsiveSize(40)} color={getIconColor(focused)} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Messages'}),
        })}
      />
    </Bottom.Navigator>
  );
});

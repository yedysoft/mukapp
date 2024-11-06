import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ShopScreen from '../screens/main/ShopScreen';
import HomeScreen from '../screens/main/HomeScreen';
import MessagesScreen from '../screens/main/social/MessagesScreen';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import {YedyPalette} from '../themes/YedyPalette';
import {useServices} from '../services';
import {useTheme} from '../hooks';
import {YedyIcon} from '../components/custom';
import {responsiveHeight} from '../utils/util';

const Bottom = createBottomTabNavigator();
export default observer(() => {
  const {colors} = useTheme();
  const {ui, room, media} = useStores();
  const {api} = useServices();
  const keyboardVisible = ui.isKeyboardVisible;
  const dominantColor = media.getDominantColor ?? colors.background;
  const barColor = ui.pickerViewVisible
    ? colors.dialog
    : room.isLive && !room.isRoomPageOn
    ? dominantColor
    : colors.background;
  const isColorLight = api.helper.isColorLight(barColor);

  const getIconColor = (focused: boolean) => {
    if (focused) {
      return room.isLive && isColorLight ? YedyPalette.green_dark : colors.primary;
    }
    return room.isLive ? (isColorLight ? colors.dark : colors.light) : colors.outlineVariant;
  };

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: keyboardVisible ? 'none' : undefined,
          backgroundColor: barColor,
          borderTopWidth: 0,
          height: responsiveHeight(60),
        },
        headerShown: false,
      }}
      backBehavior={'history'}
    >
      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <YedyIcon icon={focused ? 'cart' : 'cart-outline'} scale={0.5} color={getIconColor(focused)} />
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
          tabBarIcon: ({focused}) => (
            <YedyIcon
              icon={focused ? 'view-agenda' : 'view-agenda-outline'}
              scale={0.5}
              color={getIconColor(focused)}
            />
          ),
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
            <YedyIcon icon={focused ? 'chat' : 'chat-outline'} scale={0.5} color={getIconColor(focused)} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: () => navigation.navigate('Main', {tab: 'Messages'}),
        })}
      />
    </Bottom.Navigator>
  );
});

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
import {YedyIconName} from '../types';

const Bottom = createBottomTabNavigator();

type BottomTabItem = {
  name: 'Shop' | 'Home' | 'Messages';
  component: any;
  icon: YedyIconName;
  focusedIcon: YedyIconName;
};
const BottomTabItems: BottomTabItem[] = [
  {name: 'Shop', component: ShopScreen, icon: 'cart-outline', focusedIcon: 'cart'},
  {name: 'Home', component: HomeScreen, icon: 'view-agenda-outline', focusedIcon: 'view-agenda'},
  {name: 'Messages', component: MessagesScreen, icon: 'chat-outline', focusedIcon: 'chat'},
];

export default observer(() => {
  const {colors} = useTheme();
  const {ui, room, media} = useStores();
  const {api} = useServices();
  const keyboardVisible = ui.isKeyboardVisible;
  const dominantColor = media.getDominantColor ?? colors.background;
  const barColor = ui.pickerViewVisible
    ? colors.dialog
    : room.live && !room.isRoomPageOn
    ? dominantColor
    : colors.background;
  const isColorLight = api.helper.isColorLight(barColor);

  const getIconColor = (focused: boolean) => {
    if (focused) {
      return room.live && isColorLight ? YedyPalette.green_dark : colors.primary;
    }
    return room.live ? (isColorLight ? colors.dark : colors.light) : colors.outlineVariant;
  };

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarLabelPosition: 'below-icon',
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
      {BottomTabItems.map(tab => (
        <Bottom.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused}) => (
              <YedyIcon icon={focused ? tab.focusedIcon : tab.icon} scale={0.5} color={getIconColor(focused)} />
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: () => navigation.navigate('Main', {tab: tab.name}),
          })}
        />
      ))}
    </Bottom.Navigator>
  );
});

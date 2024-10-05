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

const Bottom = createBottomTabNavigator();
export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const keyboardVisible = ui.isKeyboardVisible;

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          display: keyboardVisible ? 'none' : undefined,
          height: responsiveHeight(80),
          backgroundColor: colors.background,
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
            <Feather name="shopping-bag" size={30} color={focused ? colors.primary : colors.outlineVariant} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            //navigation.navigate('Home');
          },
        })}
      />
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather name="grid" size={30} color={focused ? colors.primary : colors.outlineVariant} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            //navigation.navigate('Home');
          },
        })}
      />
      <Bottom.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather name="message-circle" size={30} color={focused ? colors.primary : colors.outlineVariant} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            //navigation.navigate('Home');
          },
        })}
      />
    </Bottom.Navigator>
  );
});

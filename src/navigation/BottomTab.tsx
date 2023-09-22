import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';
import MainStack from './MainStack';
import {MainHeader} from '../components/MainHeader';
import ShopScreen from '../screens/main/ShopScreen';
import {ChatScreen} from '../screens/main/social/ChatScreen';
import {responsiveHeight} from '../utils/Responsive';

const Bottom = createBottomTabNavigator();
export default function BottomTab() {
  const theme = useTheme();

  return (
    <Bottom.Navigator
      initialRouteName="Main"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: responsiveHeight(80),
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        headerShown: true,
        header: () => <MainHeader />,
      })}
    >
      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="shoppingcart" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            navigation.navigate('Home');
          },
        })}
      />
      <Bottom.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="appstore-o" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            navigation.navigate('Home');
          },
        })}
      />
      <Bottom.Screen
        name="Profile"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="user" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            navigation.navigate('Home');
          },
        })}
      />
    </Bottom.Navigator>
  );
}

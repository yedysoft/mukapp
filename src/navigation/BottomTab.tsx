import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';
import MainStack from './MainStack';
import MainHeader from '../components/MainHeader';
import ShopScreen from '../screens/main/ShopScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import {ChatScreen} from "../screens/main/social/ChatScreen";

const Bottom = createBottomTabNavigator();
export default function BottomTab() {
  const theme = useTheme();

  return (
    <Bottom.Navigator
      initialRouteName="Main"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
        },
        headerShown: true,
        header: () => <MainHeader />,
      })}
    >
      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="home" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
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
          tabBarIcon: ({focused}) => <AntDesign name="home" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
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
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="home" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //e.preventDefault();
            navigation.navigate('Home');
          },
        })}
      />
      <Bottom.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="home" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
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

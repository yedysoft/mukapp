import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';
import {MainHeader} from '../components/header/MainHeader';
import ShopScreen from '../screens/main/ShopScreen';
import {responsiveHeight} from '../utils/Responsive';
import ProfileScreen from '../screens/main/ProfileScreen';
import HomeScreen from '../screens/main/HomeScreen';

const Bottom = createBottomTabNavigator();
export default function BottomTabs() {
  const theme = useTheme();

  return (
    <Bottom.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeScreen}
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
        name="Messages"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="message1" size={30} color={focused ? theme.colors.primary : theme.colors.outlineVariant} />,
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

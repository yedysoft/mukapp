import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import YedyIconButton from '../custom/YedyIconButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {NavButton} from './NavButton';
import Token from '../user/Token';
import Coin from '../user/Coin';
import {MukLangPaths, MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {Platform, View} from 'react-native';
import useInfo from '../../hooks/useInfo';
import useGroup from '../../hooks/useGroup';
import MukImage from '../custom/MukImage';
import defaults from '../../utils/defaults';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import YedyText from '../custom/YedyText';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const params: any = route.params;
  const {media, user} = useStores();
  const {api, t} = useServices();
  const dominantColor = media.getDominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;

  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(12),
        paddingBottom: responsiveWidth(Platform.OS === 'ios' ? 8 : 12),
        paddingTop: responsiveWidth(Platform.OS === 'ios' ? 8 : 12) + (Platform.OS === 'ios' ? 0 : insets.top),
        flexDirection: 'row',
        gap: responsiveWidth(4),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <NavButton>
        <YedyIconButton
          icon={'chevron-left'}
          scale={0.7}
          onPress={() => {
            navigation.goBack();
            route.name === 'Chat' && user.set('quotedMessage', null);
          }}
          color={route.name === 'Room' ? textColor : colors.secondary}
        />
      </NavButton>
      {route.name === 'Task' ? (
        <Token />
      ) : route.name === 'Room' ? (
        <Coin textColor={textColor} />
      ) : route.name === 'Profile' && params.userId === user.getInfo.id ? (
        <YedyIconButton icon={'edit'} scale={0.4} onPress={() => navigation.navigate('Edit')} />
      ) : route.name === 'Chat' ? (
        <ChatHeader id={params?.chat.id} />
      ) : ['Notifications', 'Search', 'PS', 'Settings'].includes(route.name) ? (
        <YedyText numberOfLines={1} fontType={'bold'} fontSize={28}>
          {t.do(`main.side.${route.name.toLowerCase()}` as MukLangPaths)}
        </YedyText>
      ) : null}
    </View>
  );
});

const ChatHeader = observer(({id}: {id: string}) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user, auth} = useStores();
  const chat = user.getChats.find(c => c.id === id) ?? defaults.chat;
  const isPrivate = chat.type === 'PRIVATE';
  const info = useInfo(chat.id, isPrivate);
  const group = useGroup(chat.id, !isPrivate);
  const name = isPrivate ? info.name : group.name;
  const typingMessage = api.chat.getTyping(chat);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: responsiveWidth(4),
      }}
    >
      <MukImage
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        scale={0.7}
        style={{
          backgroundColor: colors.bubble,
          borderRadius: 100,
        }}
      />
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <YedyText fontType={'bold'} fontSize={18}>
          {chat.name ? chat.name : name}
        </YedyText>
        <YedyText fontSize={12} visible={!!typingMessage} style={{color: colors.primary}}>
          {typingMessage}
        </YedyText>
      </View>
    </View>
  );
});

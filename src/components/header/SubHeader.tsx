import {useGroup, useInfo, useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {YedyIconButton, YedyImage, YedyText} from '../custom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import Token from '../user/Token';
import Coin from '../user/Coin';
import {MukLangPaths} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {Platform, View} from 'react-native';
import defaults from '../../utils/defaults';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default observer(() => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const params: any = route.params;
  const {media, user} = useStores();
  const {api, t} = useServices();
  const dominantColor = media.getDominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;
  const isTextPage = ['Notifications', 'Search', 'PS', 'Settings', 'Edit', 'Blocked'].includes(route.name);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(isTextPage ? 24 : 8),
        paddingBottom: responsiveWidth(12),
        paddingTop: responsiveWidth(Platform.OS === 'ios' ? 8 : 12) + (Platform.OS === 'ios' ? 0 : insets.top),
        flexDirection: 'row',
        gap: responsiveWidth(4),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <YedyIconButton
        icon={'chevron-left'}
        scale={0.55}
        onPress={() => {
          navigation.goBack();
          route.name === 'Chat' && user.set('quotedMessage', null);
        }}
        color={route.name === 'Room' ? textColor : colors.secondary}
      />
      {route.name === 'Task' ? (
        <Token />
      ) : route.name === 'Room' ? (
        <Coin textColor={textColor} />
      ) : route.name === 'Profile' && params.userId === user.info.id ? (
        <YedyIconButton icon={'account-edit'} scale={0.45} onPress={() => navigation.navigate('Edit')} />
      ) : route.name === 'Chat' ? (
        <ChatHeader id={params?.chat.id} />
      ) : isTextPage ? (
        <YedyText numberOfLines={1} type={'bold'} size={20}>
          {t.do(`main.side.${route.name.toLowerCase()}` as MukLangPaths)}
        </YedyText>
      ) : null}
    </View>
  );
});

const ChatHeader = observer(({id}: {id: string}) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user, auth} = useStores();
  const chat = user.chats.find(c => c.id === id) ?? defaults.chat;
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
        gap: responsiveWidth(8),
      }}
    >
      <YedyImage
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.authToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
        scale={0.6}
        style={{
          backgroundColor: colors.bubble,
          borderRadius: 100,
        }}
      />
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <YedyText type={'bold'} size={15}>
          {chat.name ? chat.name : name}
        </YedyText>
        <YedyText type={'bold'} size={10} visible={!!typingMessage} color={colors.primary}>
          {typingMessage}
        </YedyText>
      </View>
    </View>
  );
});

import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {NavButton} from './NavButton';
import Token from '../user/Token';
import Coin from '../user/Coin';
import {MukLangPaths, MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {View} from 'react-native';
import useInfo from '../../hooks/useInfo';
import useGroup from '../../hooks/useGroup';
import MukImage from '../custom/MukImage';
import defaults from '../../utils/defaults';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute();
  const params: any = route.params;
  const {media, user} = useStores();
  const {api, t} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(24),
        paddingTop: responsiveHeight(16),
        flexDirection: 'row',
        justifyContent: route.name === 'Chat' ? 'flex-start' : 'space-between',
        alignItems: 'center',
      }}
    >
      <NavButton>
        <MukIconButton
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
        <Token style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}} />
      ) : route.name === 'Room' ? (
        <Coin
          textColor={textColor}
          style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}}
        />
      ) : route.name === 'Profile' && params.userId === user.getInfo.id ? (
        <MukIconButton
          style={{justifyContent: 'flex-end', marginRight: responsiveWidth(-8)}}
          icon={'edit'}
          scale={0.4}
          onPress={() => navigation.navigate('Edit')}
        />
      ) : route.name === 'Chat' ? (
        <ChatHeader id={params?.chat.id} />
      ) : ['Notifications', 'Search', 'PS', 'Settings'].includes(route.name) ? (
        <Text style={{fontSize: responsiveSize(28), color: colors.secondary, fontWeight: '300'}}>
          {t.do(`main.side.${route.name.toLowerCase()}` as MukLangPaths)}
        </Text>
      ) : null}
    </SafeAreaView>
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
  const name = isPrivate ? info.name + ' ' + info.surname : group.name;
  const typingMessage = api.chat.getTyping(chat);

  return (
    <View style={{gap: responsiveWidth(4)}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(8)}}>
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
        <View>
          <Text style={{fontWeight: '500', fontSize: responsiveSize(18), color: colors.secondary}}>
            {chat.name ? chat.name : name}
          </Text>
          <Text
            style={{
              fontSize: responsiveSize(12),
              color: colors.primary,
              display: typingMessage ? undefined : 'none',
            }}
          >
            {typingMessage}
          </Text>
        </View>
      </View>
    </View>
  );
});

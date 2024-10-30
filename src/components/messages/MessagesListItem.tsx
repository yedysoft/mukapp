import {useGroup, useInfo, useTheme} from '../../hooks';
import {YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useServices} from '../../services';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IChat, ILastMessage} from '../../types/chat';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  chat: IChat;
};

export default observer(({chat}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const {auth} = useStores();
  const lastMessage: ILastMessage = api.chat.getLastMessage(chat.messages);
  const isPrivate = chat.type === 'PRIVATE';
  const info = useInfo(chat.id, isPrivate);
  const group = useGroup(chat.id, chat.type === 'GROUP');
  const name = isPrivate ? info.name : group.name;
  const typingMessage = api.chat.getTyping(chat);
  const dateString = lastMessage.date.toString() === '' ? new Date().toString() : lastMessage.date.toString();
  const date = api.helper.formatDateTime(dateString, 'date');
  const time = api.helper.formatDateTime(dateString, 'time');
  const datetime = date === 'Bugün' ? time : date;

  return (
    <YedyListItem style={{alignItems: 'center'}} onPress={() => navigation.navigate('Chat', {chat: chat})}>
      <YedyImage
        scale={0.75}
        style={{borderRadius: 100, borderColor: colors.primary, borderWidth: 1}}
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View style={{flex: 1, justifyContent: 'center', gap: responsiveWidth(4), paddingVertical: responsiveWidth(8)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <YedyText numberOfLines={1} type={'bold'} size={16}>
            {chat.name ? chat.name : name}
          </YedyText>
          <YedyText numberOfLines={1} type={'bold'} size={13} color={colors.outlineVariant}>
            {datetime}
          </YedyText>
        </View>
        <YedyText
          numberOfLines={1}
          size={15}
          color={typingMessage ? colors.primary : colors.secondary}
          style={{flex: 1}}
        >
          {typingMessage ? typingMessage : lastMessage.message}
        </YedyText>
      </View>
    </YedyListItem>
  );
});

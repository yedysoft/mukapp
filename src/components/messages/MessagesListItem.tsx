import {useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IChat, ILastMessage} from '../../types/chat';
import useInfo from '../../hooks/useInfo';
import useGroup from '../../hooks/useGroup';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import YedyText from '../custom/YedyText';

type Props = {
  chat: IChat;
};

export default observer(({chat}: Props) => {
  const {colors} = useTheme<MukTheme>();
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
    <MukListItem style={{alignItems: 'center'}} onPress={() => navigation.navigate('Chat', {chat: chat})}>
      <MukImage
        scale={0.8}
        style={{borderRadius: 100, borderColor: colors.primary, borderWidth: 1}}
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View style={{flex: 1, justifyContent: 'center', gap: responsiveWidth(8), paddingVertical: responsiveWidth(8)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <YedyText numberOfLines={1} fontType={'bold'} fontSize={17}>
            {chat.name ? chat.name : name}
          </YedyText>
          <YedyText numberOfLines={1} fontSize={13}>
            {datetime}
          </YedyText>
        </View>
        <YedyText
          numberOfLines={1}
          style={{
            flex: 1,
            color: typingMessage ? colors.primary : colors.secondary,
          }}
        >
          {typingMessage ? typingMessage : lastMessage.message}
        </YedyText>
      </View>
    </MukListItem>
  );
});

import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IChat, ILastMessage} from '../../types/chat';
import useInfo from '../../hooks/useInfo';
import useGroup from '../../hooks/useGroup';

type Props = {
  chat: IChat;
};

export default function MessagesListItem({chat}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const lastMessage: ILastMessage = api.chat.getLastMessage(chat.messages);
  const isPrivate = chat.type === 'PRIVATE';
  const info = useInfo(chat.id, isPrivate);
  const group = useGroup(chat.id, chat.type === 'GROUP');
  const name = isPrivate ? info.name + ' ' + info.surname : group.name;
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
        source={require('../../../assets/adaptive-icon.png')}
      />
      <View style={{flex: 1, justifyContent: 'center', gap: responsiveWidth(8), paddingVertical: responsiveWidth(8)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(17), fontWeight: '500', color: colors.secondary}}>
            {chat.name ? chat.name : name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(13),
              position: 'absolute',
              right: 0,
              color: colors.secondary,
              fontWeight: '300',
            }}
          >
            {datetime}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: responsiveSize(15),
            fontWeight: '300',
            color: typingMessage ? colors.primary : colors.secondary,
          }}
        >
          {typingMessage ? typingMessage : lastMessage.message}
        </Text>
      </View>
    </MukListItem>
  );
}

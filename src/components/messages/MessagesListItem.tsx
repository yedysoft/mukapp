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

type Props = {
  chat: IChat;
};

export default function MessagesListItem({chat}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();
  const lastMessage: ILastMessage = api.chat.getLastMessage(chat.messages);

  return (
    <MukListItem onPress={() => navigation.navigate('Chat', {chat: chat})}>
      <MukImage
        scale={1.3}
        style={{borderRadius: 100, borderColor: colors.primary, borderWidth: 1}}
        source={require('../../../assets/adaptive-icon.png')}
      />
      <View style={{flex: 1, justifyContent: 'flex-start', gap: responsiveWidth(8), paddingTop: responsiveWidth(8)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '500'}}>
            {chat.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{fontSize: responsiveSize(15), fontWeight: '400', position: 'absolute', right: 0}}
          >
            {lastMessage.date.toDateString()}
          </Text>
        </View>
        <Text numberOfLines={2} style={{flex: 1, fontSize: responsiveSize(15), fontWeight: '400'}}>
          {lastMessage.message}
        </Text>
      </View>
    </MukListItem>
  );
}

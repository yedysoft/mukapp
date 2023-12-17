import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth, screenWidth} from '../../utils/util';
import MukTextInput from '../custom/MukTextInput';
import MukIconButton from '../custom/MukIconButton';
import {IMessage} from '../../types/chat';
import {useState} from 'react';
import {useStores} from '../../stores';

type Props = {
  sendMessage: (data: IMessage) => void;
};

export default function ChatComposer({sendMessage}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {room, user} = useStores();
  const [message, setMessage] = useState<IMessage>({
    id: '',
    senderId: user.getInfo.id ?? '',
    receiverId: room.sessionId ?? '',
    date: new Date(),
    content: '',
    contentType: 0,
    type: 0,
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: responsiveWidth(4),
        padding: responsiveWidth(16),
        paddingRight: responsiveWidth(8),
        width: screenWidth,
      }}
    >
      <MukTextInput name={'composer'} value={message.content} onChange={(name, value) => setMessage({...message, content: value})} mode={'outlined'} style={{flex: 1}}/>
      <MukIconButton icon={'send'} scale={0.4} color={colors.secondary} onPress={() => sendMessage(message)}/>
    </View>
  );
}

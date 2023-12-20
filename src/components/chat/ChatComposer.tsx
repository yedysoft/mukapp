import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth, screenWidth} from '../../utils/util';
import MukTextInput from '../custom/MukTextInput';
import MukIconButton from '../custom/MukIconButton';
import {IMessage} from '../../types/chat';
import {useState} from 'react';
import {useStores} from '../../stores';
import {IMessageType} from '../../types/enums';
import defaults from '../../utils/defaults';

type Props = {
  sendMessage: (data: IMessage) => void;
  receiverId: string;
  messageType: IMessageType;
};

export default function ChatComposer({sendMessage, receiverId, messageType}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const [message, setMessage] = useState<IMessage>({
    ...defaults.message,
    senderId: user.getInfo.id ?? '',
    receiverId: receiverId,
    type: messageType,
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
      <MukTextInput
        name={'composer'}
        value={message.content}
        onChange={(name, value) => setMessage({...message, content: value})}
        mode={'outlined'}
        multiline={true}
        style={{flex: 1}}
      />
      <MukIconButton
        icon={'send'}
        scale={0.5}
        color={colors.secondary}
        onPress={() => {
          if (message.content !== '') {
            sendMessage({...message, date: new Date()});
            setMessage({...message, content: ''});
          }
        }}
      />
    </View>
  );
}

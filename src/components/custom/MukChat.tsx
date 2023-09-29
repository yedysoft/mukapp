import {useTheme} from 'react-native-paper';
import {Composer, GiftedChat, IMessage, InputToolbar, Send} from 'react-native-gifted-chat';
import {useCallback, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {Message} from '@stomp/stompjs';
import MukIcon from './MukIcon';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';

type Props = {
  subDestination: string;
  sendDestination: string;
};

export const MukChat = observer(({subDestination, sendDestination}: Props) => {
  const {colors} = useTheme();
  const {user} = useStores();
  const {api} = useServices();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const readMessages = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  const listenPublicChat = (message: Message) => {
    readMessages(JSON.parse(message.body));
  };

  const sendPublicMessage = (m: any) => {
    api.socket.sendMessage(sendDestination, m);
  };

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.background,
        borderTopColor: colors.primary,
        borderTopWidth: 1,
        paddingTop: responsiveWidth(4),
        paddingBottom: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(8)
      }}
      primaryStyle={{}}
    />
  )

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputAutoFocus
      textInputStyle={{
        color: colors.secondary,
      }}
      placeholderTextColor={colors.secondary}
      placeholder=""
    />
  )

  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MukIcon icon="send" scale={.6} />
    </Send>
  )

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => sendPublicMessage(newMessages)}
      user={{
        _id: user.getInfo.id || '-1',
      }}
      messagesContainerStyle={{paddingVertical: responsiveWidth(16)}}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
    />
  );
});

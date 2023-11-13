import {useTheme} from 'react-native-paper';
import {Composer, GiftedChat, IMessage, InputToolbar, Send} from 'react-native-gifted-chat';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukIcon from './MukIcon';
import {responsiveWidth} from '../../utils/Responsive';
import {PVoid} from '../../types';

type Props = {
  sendMessage: (data: IMessage[]) => PVoid;
  messages: IMessage[];
};

export const MukChat = observer(({sendMessage, messages}: Props) => {
  const {colors} = useTheme();
  const {user} = useStores();

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.background,
        borderTopColor: colors.primary,
        borderTopWidth: 1,
        paddingTop: responsiveWidth(4),
        paddingBottom: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(8),
      }}
      primaryStyle={{}}
    />
  );

  const renderComposer = (props: any) => (
    <Composer
      {...props}
      textInputAutoFocus
      textInputStyle={{
        color: colors.secondary,
      }}
      placeholderTextColor={colors.secondary}
      placeholder=""
    />
  );

  const renderSend = (props: any) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MukIcon icon="send" scale={0.6} />
    </Send>
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => sendMessage(newMessages)}
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

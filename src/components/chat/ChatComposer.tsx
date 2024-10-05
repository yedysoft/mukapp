import {useTheme} from 'react-native-paper';
import {Platform, View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import MukTextInput, {MukTextInputRef} from '../custom/MukTextInput';
import MukIconButton from '../custom/MukIconButton';
import {IMessage} from '../../types/chat';
import {useRef} from 'react';
import {useStores} from '../../stores';
import {IMessageType} from '../../types/enums';
import defaults from '../../utils/defaults';
import {useServices} from '../../services';
import {observer} from 'mobx-react';
import uuid from 'react-native-uuid';
import ChatQuotedMessage from './ChatQuotedMessage';

type Props = {
  sendMessage: (data: IMessage) => void;
  receiverId: string;
  messageType: IMessageType;
};

export default observer(({sendMessage, receiverId, messageType}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const {api} = useServices();
  const inputRef = useRef<MukTextInputRef>(null);
  const typingRef = useRef<boolean>();
  const message = {
    ...defaults.message,
    senderId: user.getInfo.id ?? '',
    receiverId: receiverId,
    type: messageType,
  };

  const handleChange = () => {
    if (messageType !== 'PUBLIC') {
      !typingRef.current && sendTyping(true);
      api.helper.sleep(800, 'chat1').then(async () => {
        await sendTyping(false);
      });
    }
  };

  const sendTyping = async (typing: boolean) => {
    typingRef.current = typing;
    await api.subscription.sendMessageTyping({
      typing: typing,
      senderId: user.getInfo.id,
      receiverId: receiverId,
      type: messageType,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: responsiveWidth(4),
        padding: responsiveWidth(12),
        paddingBottom: Platform.OS === 'ios' ? 0 : undefined,
      }}
    >
      <MukTextInput
        ref={inputRef}
        name={'composer'}
        onChange={handleChange}
        multiline={true}
        textAlignVertical={'top'}
        showError={false}
        preValidate={'required'}
        viewStyle={{flex: 1}}
        quotedMessage={
          user.quotedMessage ? (
            <ChatQuotedMessage quotedMessage={user.quotedMessage} onPress={() => user.set('quotedMessage', null)} />
          ) : undefined
        }
      />
      <MukIconButton
        icon={'send'}
        scale={0.5}
        color={colors.secondary}
        style={{alignSelf: user.quotedMessage ? 'flex-end' : 'center'}}
        onPress={() => {
          if (inputRef.current) {
            const value = (inputRef.current.inputValue() as string).trim();
            if (inputRef.current.validateInput(value)) {
              sendMessage({
                ...message,
                quotedMessageId: user.quotedMessage?.id,
                content: value,
                date: new Date(),
                tempId: uuid.v4() as string,
              });
              inputRef.current.clear();
              user.set('quotedMessage', null);
            }
          }
        }}
      />
    </View>
  );
});

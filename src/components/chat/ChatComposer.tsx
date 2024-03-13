import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
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
import uuid from 'uuid';

type Props = {
  sendMessage: (data: IMessage) => void;
  receiverId: string;
  messageType: IMessageType;
};

export default observer(({sendMessage, receiverId, messageType}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user, ui} = useStores();
  const {api} = useServices();
  const inputRef = useRef<MukTextInputRef>(null);
  const typingRef = useRef<boolean>();
  const message = {
    ...defaults.message,
    senderId: user.getInfo.id ?? '',
    receiverId: receiverId,
    type: messageType,
  };

  const handleCustomChange = (_name: string, _value: string) => {
    if (messageType !== 'Public') {
      !typingRef.current && sendTyping(true);
      api.helper.sleep(500, 'chat1').then(async () => {
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
        justifyContent: 'space-between',
        gap: responsiveWidth(4),
        padding: responsiveWidth(16),
        paddingRight: responsiveWidth(8),
        width: ui.windowWidth,
      }}
    >
      <MukTextInput
        ref={inputRef}
        name={'composer'}
        onCustomChange={handleCustomChange}
        defaultValue={message.content}
        multiline={true}
        textAlignVertical={'top'}
        showError={false}
        preValidate={'required'}
        style={{paddingTop: responsiveWidth(16)}}
        viewStyle={{flex: 1}}
      />
      <MukIconButton
        icon={'send'}
        scale={0.5}
        color={colors.secondary}
        onPress={() => {
          if (inputRef.current) {
            const value = inputRef.current.inputValue().trim();
            if (inputRef.current.validateInput(value)) {
              sendMessage({...message, content: value, date: new Date(), tempId: uuid.v4()});
              inputRef.current.clear();
            }
          }
        }}
      />
    </View>
  );
});

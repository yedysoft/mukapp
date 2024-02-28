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

type Props = {
  sendMessage: (data: IMessage) => void;
  receiverId: string;
  messageType: IMessageType;
};

export default function ChatComposer({sendMessage, receiverId, messageType}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {user, ui} = useStores();
  const inputRef = useRef<MukTextInputRef>(null);
  const message = {
    ...defaults.message,
    senderId: user.getInfo.id ?? '',
    receiverId: receiverId,
    type: messageType,
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
              sendMessage({...message, content: value, date: new Date()});
              inputRef.current.clear();
            }
          }
        }}
      />
    </View>
  );
}

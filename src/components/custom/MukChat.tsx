import {observer} from 'mobx-react';
import {PVoid} from '../../types';
import ChatList from '../chat/ChatList';
import ChatComposer from '../chat/ChatComposer';
import {View} from 'react-native';
import {IMessage} from '../../types/chat';
import {IMessageType} from '../../types/enums';

type Props = {
  sendMessage: (data: IMessage) => PVoid;
  messages: IMessage[];
  receiverId: string;
  messageType: IMessageType;
};

export const MukChat = observer(({sendMessage, messages, receiverId, messageType}: Props) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ChatList data={messages} />
      <ChatComposer sendMessage={sendMessage} receiverId={receiverId} messageType={messageType} />
    </View>
  );
});

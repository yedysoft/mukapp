import {observer} from 'mobx-react';
import {PVoid} from '../../../types';
import YedyChatList from './YedyChatList';
import ChatComposer from './YedyChatComposer';
import {View} from 'react-native';
import {IMessage} from '../../../types/chat';
import {IMessageType} from '../../../types/enums';

type Props = {
  sendMessage: (data: IMessage) => PVoid;
  messages: IMessage[];
  receiverId: string;
  messageType: IMessageType;
};

export default observer(({sendMessage, messages, receiverId, messageType}: Props) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <YedyChatList data={messages} />
      <ChatComposer sendMessage={sendMessage} receiverId={receiverId} messageType={messageType} />
    </View>
  );
});

import {useTheme} from 'react-native-paper';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme, PVoid} from '../../types';
import ChatList from '../chat/ChatList';
import ChatComposer from '../chat/ChatComposer';
import {screenWidth} from '../../utils/util';
import {View} from 'react-native';
import {IMessage} from '../../types/chat';

type Props = {
  sendMessage: (data: IMessage) => PVoid;
  messages: IMessage[];
};

export const MukChat = observer(({sendMessage, messages}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: screenWidth}}>
      <ChatList data={[...Array(10)] /*TODO: ARRAY TERSTEN VERİLECEK*/} />
      <ChatComposer name={''} value={''} handleOnChange={() => console.log('compose')} />
    </View>
  );
});

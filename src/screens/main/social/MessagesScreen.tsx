import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';

const chatsData = [
  {
    username: 'username1',
    date: '12:34',
    message: 'message1',
  },
  {
    username: 'username2',
    date: '12:34',
    message: 'message2',
  },
];

export const MessagesScreen = observer(() => {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <MessagesList chats={chatsData}/>
    </MainLayout>
  );
});

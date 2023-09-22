import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {MukChat} from '../../../components/custom/MukChat';

export const ChatScreen = observer(() => {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <MukChat
        subDestination={'/room/9651ca84-f93a-41a3-ab85-592d6ccdfbf4/publicChat'}
        sendDestination={'/app/room/9651ca84-f93a-41a3-ab85-592d6ccdfbf4/sendPublicMessage'}
      />
    </MainLayout>
  );
});

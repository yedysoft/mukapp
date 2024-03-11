import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../utils/util';
import FriendsList from './FriendsList';
import {useStores} from '../../stores';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IChat} from '../../types/chat';

const CreateChat = observer(() => {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<MainStackNavProp>();
  const {t, api} = useServices();
  const {user, room} = useStores();
  const [users, setUsers] = useState(user.getFollows);

  useEffect(() => {
    setUsers(user.getFollows);
  }, [user.getFollows]);

  const selectUser = (id: string) => {
    setUsers(users.map(user => (user.id === id ? {...user, selected: !user.selected} : user)));
  };

  const handleSheet = () => {
    user.getInfo.id && api.user.getFollows(user.getInfo.id);
    sheetRef.current?.expand();
  };

  const createChat = async () => {
    let chat: IChat | null = null;
    const selectionLength = users.filter(u => u.selected).length;
    if (selectionLength === 1) {
      const selectedUser = users.find(u => u.selected);
      if (selectedUser) {
        const chatFound = user.getChats.find(c => c.id === selectedUser.id);
        if (!chatFound) {
          chat = {
            id: selectedUser.id,
            name: selectedUser.userName,
            type: 'Private',
            typing: false,
            messages: [],
          };
          user.set('chats', [...user.getChats, chat]);
        } else {
          chat = chatFound;
        }
      }
    } else if (selectionLength > 1) {
      chat = await api.chat.createGroup({
        id: '',
        name: `${user.getInfo.userName}'s Group`,
        users: users.map(u => ({id: u.id, authority: 'User'})),
      });
    }
    chat && navigation.navigate('Chat', {chat: chat});
    sheetRef.current?.close();
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet
        snaps={[users.length > 0 ? '70%' : '44%']}
        sheetRef={sheetRef}
        containerStyle={{marginBottom: room.isLive ? 88 : 0}}
        contentStyle={{
          gap: responsiveWidth(16),
          justifyContent: 'space-between',
          paddingVertical: responsiveWidth(16),
        }}
      >
        <FriendsList friends={users} onPress={selectUser} />
        <MukButton label={t.do('main.social.newChat')} onPress={() => createChat()} />
      </MukSheet>
    </>
  );
});

export default CreateChat;

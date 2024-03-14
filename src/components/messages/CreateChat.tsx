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
import {IFollowUser} from '../../types/user';

const CreateChat = observer(() => {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<MainStackNavProp>();
  const {t, api} = useServices();
  const {user, room, ui} = useStores();
  const [users, setUsers] = useState<(IFollowUser & {selected: boolean})[]>([]);

  useEffect(() => {
    setUsers(user.getFollows.map(u => ({...u, selected: false})));
  }, [user.getFollows]);

  const selectUser = (id: string) => {
    setUsers(users.map(u => (u.id === id ? {...u, selected: !u.selected} : u)));
  };

  const handleSheet = () => {
    user.getInfo.id && api.user.getFollows(user.getInfo.id);
    sheetRef.current?.expand();
  };

  const createChat = async () => {
    let chat: IChat | null = null;
    const selectedUsers = users.filter(u => u.selected);
    if (selectedUsers.length === 1) {
      const selectedUser = selectedUsers[0];
      const chatFound = user.chats.find(c => c.id === selectedUser.id);
      if (chatFound) {
        chat = chatFound;
      } else {
        chat = {
          id: selectedUser.id,
          name: selectedUser.name + ' ' + selectedUser.surname,
          type: 'Private',
          typing: false,
          messages: [],
        };
        user.set('chats', [chat, ...user.getChats]);
      }
    } else if (selectedUsers.length > 1) {
      chat = await api.chat.createGroup({
        id: '',
        name: `${user.getInfo.userName}'s Group`,
        users: selectedUsers.map(u => ({id: u.id, authority: 'User'})),
      });
    }
    if (chat) {
      navigation.navigate('Chat', {chat: chat});
      sheetRef.current?.close();
    } else {
      ui.addWarning('En az 1 kullanıcı seçmelisiniz.');
    }
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
        <MukButton label={t.do('main.social.newChat')} onPress={createChat} />
      </MukSheet>
    </>
  );
});

export default CreateChat;

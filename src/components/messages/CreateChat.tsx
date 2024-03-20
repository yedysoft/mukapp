import MukFAB from '../../components/custom/MukFAB';
import {useEffect, useRef, useState} from 'react';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import FriendsList from './FriendsList';
import {useStores} from '../../stores';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IChat} from '../../types/chat';
import {IFollowUser} from '../../types/user';
import MukBottomSheet, {MukBottomSheetRef} from '../custom/MukBottomSheet';
import {responsiveWidth} from '../../utils/util';

export default observer(() => {
  const navigation = useNavigation<MainStackNavProp>();
  const {t, api} = useServices();
  const {user, ui} = useStores();
  const [users, setUsers] = useState<(IFollowUser & {selected: boolean})[]>([]);
  const sheetRef = useRef<MukBottomSheetRef>(null);

  useEffect(() => {
    setUsers(user.getFollows.map(u => ({...u, selected: false})));
  }, [user.getFollows]);

  const selectUser = (id: string) => {
    setUsers(users.map(u => (u.id === id ? {...u, selected: !u.selected} : u)));
  };

  const handleOnPress = () => {
    user.getInfo.id && api.user.getFollows(user.getInfo.id);
    sheetRef.current?.open();
  };

  const createChat = async () => {
    let chat: IChat | null = null;
    const selectedUsers = users.filter(u => u.selected);
    if (selectedUsers.length === 1) {
      const selectedUser = selectedUsers[0];
      console.log(user);
      const chatFound = user.getChats.find(c => c.id === selectedUser.id);
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
        name: `${user.getInfo.name}'s Group`,
        users: selectedUsers.map(u => ({id: u.id, authority: 'User'})),
      });
    }
    if (chat) {
      sheetRef.current?.close(true);
      navigation.navigate('Chat', {chat: chat});
    } else {
      ui.addWarning('En az 1 kullanıcı seçmelisiniz.');
    }
  };

  return (
    <>
      <MukFAB onPress={handleOnPress} icon={'message-square'} />
      <MukBottomSheet
        ref={sheetRef}
        style={{
          gap: responsiveWidth(16),
          justifyContent: 'space-between',
          paddingVertical: responsiveWidth(16),
        }}
      >
        <FriendsList friends={users} onPress={selectUser} />
        <MukButton label={t.do('main.social.newChat')} onPress={createChat} />
      </MukBottomSheet>
    </>
  );
});

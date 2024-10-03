import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';
import React, {useEffect, useState} from 'react';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import {View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import MukButton from '../custom/MukButton';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IFollowUser} from '../../types/user';
import {IChat} from '../../types/chat';
import FriendsList from '../messages/FriendsList';

const CreateChatTooltip = observer(({positions, visible, changeVisible}: TooltipScreenProps) => {
  const navigation = useNavigation<MainStackNavProp>();
  const {t, api} = useServices();
  const {user, ui} = useStores();
  const [users, setUsers] = useState<(IFollowUser & {selected: boolean})[]>([]);

  useEffect(() => {
    setUsers(user.getFollows.map(u => ({...u, selected: false})));
  }, [user.getFollows]);

  const selectUser = (id: string) => {
    setUsers(v => v.map(u => (u.id === id ? {...u, selected: !u.selected} : u)));
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
          type: 'PRIVATE',
          typing: false,
          messages: [],
        };
        user.set('chats', [chat, ...user.getChats]);
      }
    } else if (selectedUsers.length > 1) {
      chat = await api.chat.createGroup({
        id: '',
        name: `${user.getInfo.name}'s Group`,
        users: selectedUsers.map(u => ({id: u.id, authority: 'USER'})),
      });
    }
    if (chat) {
      changeVisible(false);
      navigation.navigate('Chat', {chat: chat});
    } else {
      ui.addWarning('En az 1 kullanıcı seçmelisiniz.');
    }
  };

  return (
    <MukTooltip
      anchor={'on-top'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: ui.windowWidth - responsiveWidth(32), maxHeight: ui.windowHeight / 2}}
    >
      <View
        style={{
          flex: 1,
          gap: responsiveWidth(16),
          justifyContent: 'space-between',
          padding: responsiveWidth(16),
        }}
      >
        <FriendsList friends={users} onPress={selectUser} />
        <MukButton
          buttonStyle={{paddingVertical: responsiveWidth(16)}}
          label={t.do('main.social.newChat')}
          onPress={createChat}
        />
      </View>
    </MukTooltip>
  );
});

export default (props: TooltipScreenProps) => <CreateChatTooltip {...props} />;

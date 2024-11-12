import {YedyButton, YedyTooltip} from '../../custom';
import {Positions, YedyPopupScreenRef} from '../../../types';
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';
import {observer} from 'mobx-react';
import {View} from 'react-native';
import {responsiveWidth} from '../../../utils/util';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../../navigation/MainStack';
import {IFollowUser} from '../../../types/user';
import {IChat} from '../../../types/chat';
import FriendsList from '../../messages/FriendsList';

export default observer(
  forwardRef<YedyPopupScreenRef>((_props, ref) => {
    const navigation = useNavigation<MainStackNavProp>();
    const {t, api} = useServices();
    const {user, ui} = useStores();
    const [users, setUsers] = useState<(IFollowUser & {selected: boolean})[]>([]);
    const [visible, setVisible] = useState(false);
    const [positions, setPositions] = useState<Positions>();

    const changeVisible = (open: boolean) => {
      setVisible(open);
    };

    useImperativeHandle(ref, () => ({
      open: () => changeVisible(true),
      close: () => changeVisible(false),
      sendPositions: positions => setPositions(positions),
    }));

    useEffect(() => {
      visible && api.user.getFollows(user.info.id);
    }, [visible]);

    useEffect(() => {
      setUsers(user.follows.map(u => ({...u, selected: false})));
    }, [user.follows]);

    const selectUser = (id: string) => {
      setUsers(v => v.map(u => (u.id === id ? {...u, selected: !u.selected} : u)));
    };

    const createChat = async () => {
      let chat: IChat | null = null;
      const selectedUsers = users.filter(u => u.selected);
      if (selectedUsers.length === 1) {
        const selectedUser = selectedUsers[0];
        console.log(user);
        const chatFound = user.chats.find(c => c.id === selectedUser.id);
        if (chatFound) {
          chat = chatFound;
        } else {
          chat = {
            id: selectedUser.id,
            name: selectedUser.name,
            type: 'PRIVATE',
            typing: false,
            messages: [],
          };
          user.set('chats', v => [chat as IChat, ...v]);
        }
      } else if (selectedUsers.length > 1) {
        chat = await api.chat.createGroup({
          id: '',
          name: `${user.info.name}'s Group`,
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
      <YedyTooltip
        anchor={'on-top'}
        positions={positions}
        visible={visible}
        changeVisible={changeVisible}
        style={{width: ui.windowWidth, borderRadius: 0, maxHeight: ui.windowHeight / 2}}
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
          <YedyButton
            buttonStyle={{paddingVertical: responsiveWidth(12)}}
            label={t.do('main.social.newChat')}
            onPress={createChat}
          />
        </View>
      </YedyTooltip>
    );
  }),
);

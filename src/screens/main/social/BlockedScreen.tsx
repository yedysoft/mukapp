import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../components/layouts/MainLayout';
import {responsiveWidth} from '../../../utils/util';
import {MukTheme} from '../../../types';
import {useEffect, useState} from 'react';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';
import {FlatList} from 'react-native';
import BlockedListItem from '../../../components/block/BlockedListItem';
import {IBlockedUser} from '../../../types/user';

export default function BlockedScreen() {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();

  const [blockedList, setBlockedList] = useState<Array<IBlockedUser>>();

  const getBlockedList = () => {
    api.user.getBlockedUsers();
    setBlockedList(user.getBlockedUsers);
  };

  useEffect(() => {
    getBlockedList();
  }, []);

  const handleBlock = (id: string) => {
    api.user.unblockUser(id);
    getBlockedList();
  };

  return (
    <MainLayout>
      <FlatList
        contentContainerStyle={{gap: responsiveWidth(8)}}
        scrollEnabled
        data={blockedList}
        renderItem={({item}) => <BlockedListItem item={item} onIconPress={handleBlock} />}
      />
    </MainLayout>
  );
}

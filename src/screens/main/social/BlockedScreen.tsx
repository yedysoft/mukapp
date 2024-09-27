import {responsiveWidth} from '../../../utils/util';
import {useEffect, useState} from 'react';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';
import {FlatList} from 'react-native';
import BlockedListItem from '../../../components/block/BlockedListItem';
import {IBlockedUser} from '../../../types/user';
import MukImage from '../../../components/custom/MukImage';
import {SubLayout} from '../../../components/layouts/SubLayout';

export default function BlockedScreen() {
  const {api} = useServices();
  const {user} = useStores();

  const [blockedList, setBlockedList] = useState<Array<IBlockedUser>>([]);

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
    <SubLayout>
      {blockedList.length > 0 ? (
        <FlatList
          contentContainerStyle={{gap: responsiveWidth(8)}}
          scrollEnabled
          data={blockedList}
          renderItem={({item}) => <BlockedListItem item={item} onIconPress={handleBlock} />}
        />
      ) : (
        <MukImage
          source={require('../../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      )}
    </SubLayout>
  );
}

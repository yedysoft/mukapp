import {responsiveWidth} from '../../../utils/util';
import {useEffect} from 'react';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';
import {FlatList} from 'react-native';
import BlockedListItem from '../../../components/block/BlockedListItem';
import {SubLayout} from '../../../components/layouts/SubLayout';
import {observer} from 'mobx-react';
import YedyEmptyList from '../../../components/custom/YedyEmptyList';

export default observer(() => {
  const {api} = useServices();
  const {user} = useStores();

  useEffect(() => {
    api.user.getBlockedUsers();
  }, []);

  const handleBlock = (id: string) => {
    api.user.unblockUser(id);
  };

  return (
    <SubLayout>
      <FlatList
        contentContainerStyle={{gap: responsiveWidth(8)}}
        scrollEnabled
        data={user.blockedUsers}
        renderItem={({item}) => <BlockedListItem item={item} onIconPress={handleBlock} />}
        ListEmptyComponent={<YedyEmptyList />}
      />
    </SubLayout>
  );
});

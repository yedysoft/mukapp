import NotificationListItem from './NotificationListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {useEffect} from 'react';
import {YedyEmptyList} from '../custom';

type Props = {
  compact: boolean;
};

export default observer(({compact}: Props) => {
  const {api} = useServices();
  const {user} = useStores();

  useEffect(() => {
    !compact && api.user.updateReaded();
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      scrollEnabled
      ListEmptyComponent={<YedyEmptyList />}
      data={user.getNotifications}
      renderItem={({item, index}) => <NotificationListItem key={index} compact={compact} notification={item} />}
    />
  );
});

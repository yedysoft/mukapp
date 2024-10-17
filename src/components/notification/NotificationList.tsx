import NotificationListItem from './NotificationListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {YedyImage} from '../custom';
import {useServices} from '../../services';
import {useEffect} from 'react';

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
      ListEmptyComponent={
        <YedyImage
          source={require('../../../assets/noimage-gray.png')}
          scale={compact ? 1.5 : 2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      }
      data={user.getNotifications}
      renderItem={({item, index}) => <NotificationListItem key={index} compact={compact} notification={item} />}
    />
  );
});

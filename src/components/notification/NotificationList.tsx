import {useTheme} from 'react-native-paper';
import NotificationListItem from './NotificationListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();

  return (
    <FlatList
      style={{}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
      scrollEnabled
      data={user.getNotifications}
      renderItem={({item, index}) => <NotificationListItem key={index} notification={item} />}
    />
  );
});

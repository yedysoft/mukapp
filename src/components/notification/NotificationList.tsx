import {useTheme} from 'react-native-paper';
import NotificationListItem from './NotificationListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukImage from '../custom/MukImage';
import {useServices} from '../../services';
import {useEffect} from 'react';

type Props = {
  compact: boolean;
};

export default observer(({compact}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();

  useEffect(() => {
    api.user.updateReaded();
  }, []);

  return (
    <>
      {user.getNotifications.length > 0 ? (
        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
          scrollEnabled
          data={user.getNotifications}
          renderItem={({item, index}) => <NotificationListItem key={index} compact={compact} notification={item} />}
        />
      ) : (
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={compact ? 1.5 : 2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      )}
    </>
  );
});

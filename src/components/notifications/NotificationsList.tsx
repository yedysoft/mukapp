import {useTheme} from 'react-native-paper';
import NotificationsListItem from './NotificationsListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {IFollowRequest} from '../../types/user';
import {MukTheme} from '../../types';

type Props = {
  list: IFollowRequest[];
};

export default function NotificationsList({list}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: responsiveWidth(16), gap: responsiveWidth(8)}}
      scrollEnabled
      data={list}
      renderItem={({item}) => <NotificationsListItem notification={item} buttons={true} />}
    />
  );
}

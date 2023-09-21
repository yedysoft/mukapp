import {useTheme} from 'react-native-paper';
import NotificationListItem from '../../../components/drawer/notifications/NotificationListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../../utils/Responsive';

const data = [
  {
    image: '',
    context: 'Ayca_22 sana bir sesli mesaj gönderdi.',
  },
  {
    image: '',
    context: 'Bugün hiç oy kullanmadın hala ne bekliyorsun?',
  },
];

export default function NotificationList() {
  const {colors} = useTheme();

  return <FlatList style={{marginTop: responsiveWidth(16)}} scrollEnabled data={data} renderItem={({item}) => <NotificationListItem notification={item} />} />;
}

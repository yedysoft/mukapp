import {useTheme} from 'react-native-paper';
import NotificationListItem from './NotificationListItem';
import {FlatList} from 'react-native';

const data = [
  {
    image: '',
    context: 'Ayca_22 sana bir sesli mesaj gönderdi.',
  },
  {
    image: '',
    context: 'Bugün hiç oy kullanmadın hala ne bekliyorsun?',
  },
  {
    image: '',
    context: 'Ayca_22 sana bir sesli mesaj gönderdi.',
  },
  {
    image: '',
    context: 'Bugün hiç oy kullanmadın hala ne bekliyorsun?',
  },
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

  return <FlatList style={{}} scrollEnabled data={data} renderItem={({item}) => <NotificationListItem notification={item} />} />;
}

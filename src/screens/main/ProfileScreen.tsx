import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalUserProfile from '../../components/user/VerticalUserProfile';
import MukFallowerButtons from '../../components/profile/MukFallowerButtons';
import FavoritesCardList from '../../components/profile/FavoritesCardList';

const chipData = [
  {
    icon: 'music-box',
    categories: 'Rap',
  },
  {
    icon: 'music-box',
    categories: 'R&B',
  },
  {
    icon: 'music-box',
    categories: 'Pop',
  },
  {
    icon: 'music-box',
    categories: 'Kpop',
  },
];

const placeList = [
  {
    id: '1',
    name: 'Kardeşler Kıraathane',
    image: 'https://picsum.photos/1557',
  },
  {
    id: '2',
    name: 'Köşem Kıraathane',
    image: 'https://picsum.photos/1558',
  },
  {
    id: '3',
    name: 'Ramo Kıraathane',
    image: 'https://picsum.photos/1559',
  },
  {
    id: '4',
    name: 'YEDY Kıraathane',
    image: 'https://picsum.photos/1560',
  },
  {
    id: '5',
    name: 'Bizim Kıraathane',
    image: 'https://picsum.photos/1561',
  },
  {
    id: '6',
    name: 'Dayı Kıraathane',
    image: 'https://picsum.photos/1562',
  },
  {
    id: '7',
    name: 'Beştepe Kıraathane',
    image: 'https://picsum.photos/1563',
  },
  {
    id: '8',
    name: 'Atapark Kıraathane',
    image: 'https://picsum.photos/1564',
  },
];
export default function ProfileScreen() {
  const {colors} = useTheme();

  return (
    <MainLayout>
      <VerticalUserProfile/>
      <MukFallowerButtons/>
      <FavoritesCardList dataList={placeList} size={150}/>
      {/*   <View style={{flexDirection: 'row'}}>
        <FlatList horizontal data={chipData} renderItem={item => <MukChip mode={'outlined'} icon={item.item.icon} label={item.item.categories} />} />
      </View>*/}
    </MainLayout>
  );
}

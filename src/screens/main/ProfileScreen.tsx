import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import EditImage from '../../components/profile/EditImage';
import {useState} from 'react';
import FavoritesCardList from '../../components/profile/FavoritesCardList';
import ProfileStats from '../../components/profile/ProfileStats';

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
  const [image, setImage] = useState(
    'https://static.wikia.nocookie.net/sungerbob-karepantolon/images/8/86/Patrick-star-yildiz-sunger-bob-izle.png/revision/latest?cb=20140905123018&path-prefix=tr',
  );
  const [isVisible, setVisible] = useState(false);

  return (
    <MainLayout style={{paddingTop: responsiveWidth(100), gap: responsiveHeight(32)}}>
      <VerticalProfile image={image} onPress={() => setVisible(true)}/>
      <EditImage setImage={setImage} isVisible={isVisible} setVisible={setVisible}/>
      <ProfileStats/>
      <FavoritesCardList dataList={placeList}/>
      {/*<View style={{flexDirection: 'row'}}>
        <FlatList horizontal data={chipData} renderItem={item => <MukChip mode={'outlined'} icon={item.item.icon} label={item.item.categories} />} />
      </View>*/}
    </MainLayout>
  );
}

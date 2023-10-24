import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import EditImage from '../../components/profile/EditImage';
import {useEffect, useState} from 'react';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileList from '../../components/profile/ProfileList';
import {View} from 'react-native';
import {useServices} from '../../services';
import {useStores} from '../../stores';

export default function ProfileScreen() {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();
  const [image, setImage] = useState(require('../../../assets/adaptive-icon.png').uri);
  const [isVisible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [follows, setFollows] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);

  const fillProfile = async (id: string) => {
    await api.user.getFollows(id);
    setFollows(user.getFollows);
    await api.user.getFollowers(id);
    setFollowers(user.getFollowers);
  };

  useEffect(() => {
    fillProfile('98155e4b-781d-4d00-b3eb-238bf1ddd57c');
  }, []);

  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      <VerticalProfile image={image} onPress={() => setVisible(true)}/>
      <EditImage setImage={setImage} isVisible={isVisible} setVisible={setVisible}/>
      <View style={{gap: responsiveWidth(4)}}>
        <ProfileStats activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        <ProfileList items={[...Array(6)]}/>
      </View>
    </MainLayout>
  );
}

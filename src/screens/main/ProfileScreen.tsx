import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import EditImage from '../../components/profile/EditImage';
import {useState} from 'react';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileList from '../../components/profile/ProfileList';
import {View} from 'react-native';

export default function ProfileScreen() {
  const {colors} = useTheme();
  const [image, setImage] = useState(require('../../../assets/adaptive-icon.png').uri);
  const [isVisible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <MainLayout style={{paddingTop: responsiveWidth(100), gap: responsiveHeight(16)}}>
      <VerticalProfile image={image} onPress={() => setVisible(true)}/>
      <EditImage setImage={setImage} isVisible={isVisible} setVisible={setVisible}/>
      <View style={{gap: responsiveWidth(4)}}>
        <ProfileStats activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        <ProfileList items={[...Array(6)]}/>
      </View>
    </MainLayout>
  );
}

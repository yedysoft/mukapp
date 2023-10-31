import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {useEffect, useState} from 'react';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileList from '../../components/profile/ProfileList';
import {View} from 'react-native';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

const ProfileScreen = observer((props?: any) => {
  const userId = props.route.params?.id;
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();
  const [activeIndex, setActiveIndex] = useState(0);
  const info = userId ? user.getOtherUser : user.getInfo;

  const stats = [
    {
      value: '0',
      label: 'Oylama',
    },
    {
      value: user.getFollowers.length.toString() ?? '0',
      label: 'Takipçi',
    },
    {
      value: user.getFollows.length.toString() ?? '0',
      label: 'Takip edilen',
    },
  ];

  const fillProfile = async (id: string) => {
    await api.user.getFollows(id);
    await api.user.getFollowers(id);
  };

  if (userId)
    api.user.getInfoById(userId);

  useEffect(() => {
    console.log(userId);
    fillProfile(userId ?? info.id);
  }, [userId]);

  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      <VerticalProfile profile={info}/>
      <View style={{gap: responsiveWidth(4)}}>
        <ProfileStats stats={stats} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        <ProfileList activeIndex={activeIndex} items={activeIndex === 0 ? [] : activeIndex === 1 ? user.getFollowers : activeIndex === 2 ? user.getFollows : []}/>
      </View>
    </MainLayout>
  );
});

export default ProfileScreen;

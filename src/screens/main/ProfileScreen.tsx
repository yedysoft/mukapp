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
import {MukTheme} from '../../types';

type Props = {
  userId?: string;
};

const ProfileScreen = observer(({userId}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();
  const [activeIndex, setActiveIndex] = useState(0);
  const info = userId ? user.getOtherUser : user.getInfo;
  const otherUser = userId ? user.getInfo.id !== userId : false;

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

  const fillProfile = async (id: string | null) => {
    if (id) {
      await api.user.getFollows(id);
      await api.user.getFollowers(id);
    }
  };

  if (userId) {
    api.user.getInfoById(userId);
  }

  useEffect(() => {
    setActiveIndex(0);
    fillProfile(userId ?? info.id);
  }, [userId]);

  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      <VerticalProfile profile={info} otherUser={otherUser} />
      <View style={{gap: responsiveWidth(4)}}>
        <ProfileStats stats={stats} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <ProfileList
          otherUser={otherUser}
          onIconPress={(id: string) =>
            activeIndex === 1 ? api.user.takeOutMyFollowers(id) : activeIndex === 2 ? api.user.unFollow(id) : undefined
          }
          items={
            activeIndex === 0 ? [] : activeIndex === 1 ? user.getFollowers : activeIndex === 2 ? user.getFollows : []
          }
        />
      </View>
    </MainLayout>
  );
});

export default ProfileScreen;

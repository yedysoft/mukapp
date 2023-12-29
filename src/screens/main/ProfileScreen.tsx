import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useEffect, useState} from 'react';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileList from '../../components/profile/ProfileList';
import {View} from 'react-native';
import {useServices} from '../../services';
import {stores, useStores} from '../../stores';
import {observer} from 'mobx-react';
import {MukTheme} from '../../types';
import MukLoader from '../../components/loading/MukLoader';

const ProfileScreen = observer((props: any) => {
  const {colors} = useTheme<MukTheme>();
  const userId = props.route.params?.userId;
  const {api, t} = useServices();
  const {user} = useStores();
  const [activeIndex, setActiveIndex] = useState(0);
  const info = userId ? user.getOtherUser : user.getInfo;
  const otherUser = userId ? user.getInfo.id !== userId : false;

  const stats = [
    {
      value: user.getCountTopVoted.toString(),
      label: t.do('main.profile.votes'),
    },
    {
      value: user.getFollowers.length.toString() ?? '0',
      label: t.do('main.profile.followers'),
    },
    {
      value: user.getFollows.length.toString() ?? '0',
      label: t.do('main.profile.following'),
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
    api.user.getTopListVoteMusic(userId ?? info.id);
  }, [userId]);

  return (
    <MainLayout style={{gap: responsiveHeight(16)}}>
      {!stores.loading.getVotes ? (
        <View style={{gap: responsiveWidth(4)}}>
          <VerticalProfile profile={info} otherUser={otherUser} />
          <ProfileStats stats={stats} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <ProfileList
            tabIndex={activeIndex}
            otherUser={otherUser}
            onIconPress={(id: string) =>
              activeIndex === 1
                ? api.user.takeOutMyFollowers(id)
                : activeIndex === 2
                ? api.user.unFollow(id)
                : undefined
            }
            items={
              activeIndex === 0
                ? user.getTopVoted
                : activeIndex === 1
                ? user.getFollowers
                : activeIndex === 2
                ? user.getFollows
                : []
            }
          />
        </View>
      ) : (
        <MukLoader scale={1} loading={stores.loading.getVotes} />
      )}
    </MainLayout>
  );
});

export default ProfileScreen;

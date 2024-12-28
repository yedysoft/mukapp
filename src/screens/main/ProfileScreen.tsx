import VerticalProfile from '../../components/user/VerticalProfile';
import {responsiveWidth} from '../../utils/util';
import {useCallback, useState} from 'react';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileList from '../../components/profile/ProfileList';
import {View} from 'react-native';
import {useServices} from '../../services';
import {stores, useStores} from '../../stores';
import {observer} from 'mobx-react';
import {YedyLoaderView} from '../../components/custom';
import {SubLayout} from '../../components/layouts/SubLayout';
import {useInfo} from '../../hooks';
import {useFocusEffect, useRoute} from '@react-navigation/native';

export default observer(() => {
  const route = useRoute();
  const {userId} = route.params as {userId: string};
  const {api, t} = useServices();
  const {user} = useStores();
  const [activeIndex, setActiveIndex] = useState(1);
  const otherUser = user.info.id !== userId;
  const otherUserInfo = useInfo(userId, otherUser);
  const info = otherUser ? otherUserInfo : user.info;

  const stats = [
    {
      value: user.countTopVoted.toString(),
      label: t.do('main.profile.votes'),
      visible: false,
    },
    {
      value: user.followers.length.toString() ?? '0',
      label: t.do('main.profile.followers'),
      visible: true,
    },
    {
      value: user.follows.length.toString() ?? '0',
      label: t.do('main.profile.following'),
      visible: true,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const id = info.id;
      if (id !== 'default') {
        setActiveIndex(1);
        api.user.getFollows(id);
        api.user.getFollowers(id);
        //api.user.getTopListVoteMusic(id);
      }
    }, [info.id]),
  );

  return (
    <SubLayout>
      {!stores.loading.votes ? (
        <View style={{flex: 1, gap: responsiveWidth(4)}}>
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
              /*activeIndex === 0
                ? user.topVoted
                :*/ activeIndex === 1 ? user.followers : activeIndex === 2 ? user.follows : []
            }
          />
        </View>
      ) : (
        <YedyLoaderView />
      )}
    </SubLayout>
  );
});

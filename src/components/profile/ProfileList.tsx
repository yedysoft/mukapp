import {FlatList} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import ProfileListItem from './ProfileListItem';
import LeaderboardListItem from '../room/LeaderboardListItem';
import SongListItem from '../room/SongListItem';

type Props = {
  items: any[];
  header?: ReactElement;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
};

export default function ProfileList({items, header, onIconPress, otherUser}: Props) {
  return (
    <FlatList
      data={items}
      ListHeaderComponent={header}
      renderItem={({item, index}) => (
        false ?
          <ProfileListItem onIconPress={onIconPress} key={index} item={item} otherUser={otherUser} />
          :
          <SongListItem song={item} badge={item.total} itemType={'vote'} />
      )}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), paddingBottom: responsiveHeight(360)}}
    />
  );
}

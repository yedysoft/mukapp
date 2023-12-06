import {FlatList} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import ProfileListItem from './ProfileListItem';
import SongListItem from '../room/SongListItem';

type Props = {
  items: any[];
  header?: ReactElement;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
  tabIndex?: number;
};

export default function ProfileList({items, header, onIconPress, otherUser, tabIndex}: Props) {
  return (
    <FlatList
      data={items}
      ListHeaderComponent={header}
      renderItem={({item, index}) =>
        tabIndex !== 0 ? (
          <ProfileListItem onIconPress={onIconPress} key={index} item={item} otherUser={otherUser} />
        ) : (
          <SongListItem song={item} itemType={'vote'} disabled={true} />
        )
      }
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), paddingBottom: responsiveHeight(360)}}
    />
  );
}

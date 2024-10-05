import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import ProfileListItem from './ProfileListItem';
import SongListItem from '../room/SongListItem';
import MukImage from '../custom/MukImage';

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
          <SongListItem song={item} itemType={'vote'} disabled />
        )
      }
      scrollEnabled
      ListEmptyComponent={
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      }
    />
  );
}

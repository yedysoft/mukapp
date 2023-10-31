import {FlatList} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {ReactElement} from 'react';
import ProfileListItem from './ProfileListItem';

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
      renderItem={({item, index}) => <ProfileListItem onIconPress={onIconPress} key={index} item={item} otherUser={otherUser}/>}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), paddingBottom: responsiveHeight(360)}}
    />
  );
}

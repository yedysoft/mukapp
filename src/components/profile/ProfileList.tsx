import {FlatList} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {ReactElement} from 'react';
import ProfileListItem from './ProfileListItem';

type Props = {
  items: any[];
  header?: ReactElement;
};

export default function ProfileList({items, header}: Props) {
  return (
    <FlatList
      data={items}
      ListHeaderComponent={header}
      renderItem={({item, index}) => <ProfileListItem key={index} item={item}/>}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8), paddingBottom: responsiveHeight(360)}}
    />
  );
}

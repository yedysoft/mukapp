import {useTheme} from 'react-native-paper';
import SearchListItem from './SearchListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {ReactElement} from 'react';
import {ISearchUser} from '../../types/user';

type Props = {
  list?: ISearchUser[];
  header?: ReactElement;
}

export default function SearchList({list, header}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      ListHeaderComponent={header}
      contentContainerStyle={{paddingHorizontal: responsiveWidth(16), gap: responsiveWidth(8)}}
      scrollEnabled
      data={list}
      renderItem={({item}) => <SearchListItem user={item}/>}
    />
  );
}

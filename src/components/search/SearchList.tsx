import SearchListItem from './SearchListItem';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import {ISearchUser} from '../../types/user';
import {YedyEmptyList} from '../custom';

type Props = {
  list?: ISearchUser[];
  header?: ReactElement;
};

export default function SearchList({list, header}: Props) {
  return (
    <FlatList
      ListHeaderComponent={header}
      ListEmptyComponent={<YedyEmptyList />}
      contentContainerStyle={{paddingHorizontal: responsiveWidth(16), gap: responsiveWidth(8)}}
      scrollEnabled
      data={list}
      renderItem={({item, index}) => <SearchListItem key={index} user={item} />}
    />
  );
}

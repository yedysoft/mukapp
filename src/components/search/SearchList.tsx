import SearchListItem from './SearchListItem';
import {FlatList, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import {ISearchUser} from '../../types/user';
import {YedyImage} from '../custom';

type Props = {
  list?: ISearchUser[];
  header?: ReactElement;
};

export default function SearchList({list, header}: Props) {
  return (
    <FlatList
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={{alignItems: 'center', opacity: 0.1}}>
          <YedyImage scale={2} source={require('../../../assets/noimage-gray.png')} />
        </View>
      }
      contentContainerStyle={{paddingHorizontal: responsiveWidth(16), gap: responsiveWidth(8)}}
      scrollEnabled
      data={list}
      renderItem={({item, index}) => <SearchListItem key={index} user={item} />}
    />
  );
}

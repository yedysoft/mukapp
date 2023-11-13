import {useTheme} from 'react-native-paper';
import SearchListItem from './SearchListItem';
import {FlatList, View} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {ReactElement} from 'react';
import {ISearchUser} from '../../types/user';
import MukImage from '../custom/MukImage';

type Props = {
  list?: ISearchUser[];
  header?: ReactElement;
};

export default function SearchList({list, header}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      ListHeaderComponent={header}
      ListFooterComponent={
        <View style={{alignItems: 'center', display: list?.length === 0 ? 'flex' : 'none', opacity: 0.1}}>
          <MukImage scale={2} source={require('../../../assets/noimage-gray.png')} />
        </View>
      }
      contentContainerStyle={{paddingHorizontal: responsiveWidth(16), gap: responsiveWidth(8)}}
      scrollEnabled
      data={list}
      renderItem={({item}) => <SearchListItem user={item} />}
    />
  );
}

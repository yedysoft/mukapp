import {useTheme} from 'react-native-paper';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import MenuListItem from './MenuListItem';
import {MukMenu, MukTheme} from '../../types';

type Props = {
  menu: MukMenu[];
};

export default function MenuList({menu}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <FlatList
      data={menu}
      style={{paddingVertical: responsiveWidth(16)}}
      renderItem={({item, index}: ListRenderItemInfo<MukMenu>) => <MenuListItem key={index} item={item} />}
      scrollEnabled={true}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

import {FlatList, ListRenderItemInfo} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import MenuListItem from './MenuListItem';
import {MukMenu} from '../../types';
import {useTheme} from '../../hooks';

type Props = {
  menu: MukMenu[];
};

export default ({menu}: Props) => {
  const {colors} = useTheme();

  return (
    <FlatList
      data={menu}
      style={{paddingVertical: responsiveWidth(16)}}
      renderItem={({item, index}: ListRenderItemInfo<MukMenu>) => <MenuListItem key={index} item={item} />}
      contentContainerStyle={{
        paddingVertical: responsiveWidth(8),
        gap: responsiveWidth(4),
        backgroundColor: colors.background,
      }}
    />
  );
};

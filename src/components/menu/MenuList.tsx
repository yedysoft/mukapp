import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import MenuListItem from './MenuListItem';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

type Props = {
  menu: {
    icon: IconSource;
    label: string;
    route: string;
  }[];
};

export default function MenuList({menu}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={menu}
      style={{paddingVertical: responsiveWidth(16)}}
      renderItem={({item, index}) => <MenuListItem key={index} item={item}/>}
      scrollEnabled={false}
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}
import {useTheme} from 'react-native-paper';
import {FlatList, StyleProp, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import SongListItem from './SongListItem';

type Props = {
  songs?: {
    image?: string;
    name?: string;
    artist?: string;
  }[];
  itemStyle?: StyleProp<ViewStyle>;
};

export default function SongList({songs, itemStyle}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={songs}
      renderItem={({item, index}) => <SongListItem style={itemStyle} key={index} song={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

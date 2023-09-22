import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import SongListItem from './SongListItem';

type Props = {
  songs?: {
    image?: string;
    name?: string;
    artist?: string;
  }[];
};

export default function SongList({songs}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={songs}
      renderItem={({item, index}) => <SongListItem key={index} song={item} />}
      scrollEnabled
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

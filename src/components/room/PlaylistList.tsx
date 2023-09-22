import {useTheme} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {responsiveWidth, screenWidth} from '../../utils/Responsive';
import SongList from './SongList';
import PlaylistItem from './PlaylistItem';

type Props = {
  playlists?: {
    image?: string;
    name?: string;
    playlist?: {
      image?: string;
      name?: string;
      artist?: string;
    }[];
  }[];
};

export default function PlaylistList({playlists}: Props) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={playlists}
      renderItem={({item, index}) => {
        return (
          <View style={{flexDirection: 'column'}}>
            <PlaylistItem playlist={item} />
            <SongList itemStyle={{width: screenWidth - responsiveWidth(58)}} key={index} songs={item.playlist} />
          </View>
        );
      }}
      scrollEnabled
      horizontal
      contentContainerStyle={{paddingVertical: responsiveWidth(8)}}
    />
  );
}

import {Text, useTheme} from 'react-native-paper';
import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIconButton from '../custom/MukIconButton';

type Props = {
  song?: {
    image?: string;
    name?: string;
    artist?: string;
  };
  style?: StyleProp<ViewStyle>;
};

export default function SongListItem({song, style}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={() => console.log('song')} style={[{alignItems: 'center'}, style]}>
      <MukImage scale={1.3} source={require('../../../assets/adaptive-icon.png')} />
      <View style={{justifyContent: 'center', gap: responsiveWidth(8)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>
          {song?.name}
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
          {song?.artist}
        </Text>
      </View>
      <MukIconButton
        style={{position: 'absolute', right: responsiveWidth(16)}}
        scale={0.4}
        icon={'cards-heart-outline'}
        color={'rgba(255, 55, 95, 1)'}
      />
    </MukListItem>
  );
}

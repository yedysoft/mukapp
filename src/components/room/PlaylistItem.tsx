import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, screenWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';

type Props = {
  onPress?: () => void;
  playlist?: {
    image?: string;
    name?: string;
  };
};

export default function PlaylistItem({onPress, playlist}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={onPress} style={{alignItems: 'center', width: screenWidth}}>
      <MukImage scale={2} source={require('../../../assets/adaptive-icon.png')} />
      <Text numberOfLines={1} style={{fontSize: responsiveSize(20), fontWeight: '400'}}>
        {playlist?.name}
      </Text>
    </MukListItem>
  );
}

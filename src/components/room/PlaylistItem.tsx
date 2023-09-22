import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';

type Props = {
  playlist?: {
    image?: string;
    name?: string;
  };
};

export default function PlaylistItem({playlist}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={() => console.log('playlist')} style={{alignItems: 'center'}}>
      <MukImage scale={2} source={require('../../../assets/adaptive-icon.png')} />
      <Text numberOfLines={1} style={{fontSize: responsiveSize(20), fontWeight: '400'}}>
        {playlist?.name}
      </Text>
    </MukListItem>
  );
}

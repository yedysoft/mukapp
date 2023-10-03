import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';

type Props = {
  onPress?: () => void;
  friend?: {
    username?: string,
    image?: string,
  }
};

export default function FriendsListItem({onPress, friend}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={onPress}>
      <MukImage scale={1} style={{borderRadius: 100}} source={require('../../../assets/adaptive-icon.png')}/>
      <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400', color: colors.secondary}}>
        @{friend?.username}
      </Text>
    </MukListItem>
  );
}

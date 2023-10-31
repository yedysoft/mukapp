import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import {IFollowUser} from '../../types/user';
import {View} from 'react-native';

type Props = {
  onPress?: () => void;
  friend?: IFollowUser
};

export default function FriendsListItem({onPress, friend}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={onPress} style={{alignItems: 'center', backgroundColor: colors.backdrop, borderRadius: 16}}>
      <MukImage scale={1} style={{borderRadius: 100}} source={require('../../../assets/adaptive-icon.png')}/>
      <View style={{gap: responsiveWidth(4)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400', color: colors.secondary}}>
          {friend?.name} {friend?.surname}
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(15), fontWeight: '300', color: colors.secondary}}>
          @{friend?.userName}
        </Text>
      </View>
    </MukListItem>
  );
}

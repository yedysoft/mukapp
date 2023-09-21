import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveHeight, responsiveSize} from '../../utils/Responsive';
import MukIcon from '../../components/custom/MukIcon';
import MukIconButton from '../../components/custom/MukIconButton';
import MukListItem from '../custom/MukListItem';

type Props = {
  onPress?: () => void;
  room?: {
    name?: string;
    username?: string;
  };
};

export default function RoomListItem({onPress, room}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={onPress}>
      <MukImage scale={2} image={require('../../../assets/adaptive-icon.png')} />
      <View style={{justifyContent: 'space-between', paddingTop: responsiveHeight(16), flex: 1}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>
          {room?.name}
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
          {room?.username}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MukIcon icon={'blank'} scale={0.5} />
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MukIcon icon={'blank'} scale={0.5} />
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <MukIconButton scale={0.3} />
        </View>
      </View>
    </MukListItem>
  );
}

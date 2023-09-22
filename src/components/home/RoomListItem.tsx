import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveHeight, responsiveSize} from '../../utils/Responsive';
import MukIcon from '../../components/custom/MukIcon';
import MukIconButton from '../../components/custom/MukIconButton';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';

type Props = {
  room?: {
    name?: string;
    username?: string;
  };
};

export default function RoomListItem({room}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <MukListItem onPress={() => navigation.navigate('Room')}>
      <MukImage scale={2} source={require('../../../assets/adaptive-icon.png')} />
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
            <MukIcon icon={'chart-bar'} scale={0.5} />
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MukIcon icon={'account-group'} scale={0.5} />
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <MukIconButton scale={0.3} icon={'cards-heart-outline'} color={'rgba(255, 55, 95, 1)'} />
        </View>
      </View>
    </MukListItem>
  );
}

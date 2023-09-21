import {Text, useTheme} from 'react-native-paper';
import {TouchableOpacity, View} from "react-native";
import MukImage from "../../components/custom/MukImage";
import {responsiveHeight, responsiveSize, responsiveWidth} from "../../utils/Responsive";
import MukIcon from "../../components/custom/MukIcon";
import MukIconButton from "../../components/custom/MukIconButton";

type Props = {
  onPress?: () => void
}

export default function RoomListItem({onPress}: Props) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      gap: responsiveWidth(16),
      paddingHorizontal: responsiveWidth(16),
      paddingVertical: responsiveWidth(8)
    }} onPress={onPress}>
      <MukImage scale={2} image={require('../../../assets/adaptive-icon.png')}/>
      <View style={{justifyContent: 'space-between', paddingTop: responsiveHeight(16), flex: 1}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>Oda Adı</Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>Kullanıcı Adı</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MukIcon icon={'blank'} scale={.5}/>
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MukIcon icon={'blank'} scale={.5}/>
            <Text style={{fontSize: responsiveSize(14)}}>1.234</Text>
          </View>
          <MukIconButton scale={.3}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

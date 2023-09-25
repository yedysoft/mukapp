import {FlatList, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Card, Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukProfileButton from '../custom/MukProfileButton';
import MukChip from '../custom/MukChip';
import {useState} from 'react';
import MukIcon from '../custom/MukIcon';

const profileInfo = [
  {
    data: 'Galatasaray',
  },
  {
    data: 'Rap',
  },
];

export default function HorizontalUser() {
  const [value, setValue] = useState('');
  const {colors} = useTheme();
  const isActive = true;
  return (
    <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: responsiveHeight(20), gap: responsiveWidth(5)}}>
      <MukImage
        scale={2.8}
        source={require('../../../assets/eth.jpg')}
        style={{
          borderWidth: 2,
          borderRadius: 100,
          marginTop: 10,
          aspectRatio: 1,
          borderColor: isActive ? colors.primary : colors.backdrop,
          backgroundColor: 'white',
        }}
      />

      <View style={{paddingTop: responsiveHeight(10)}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: responsiveSize(24), fontWeight: 'bold', color: 'white'}}>Ethem Can Aslan</Text>

          {/*<MukIconButton icon={'pencil-outline'} scale={0.4} />*/}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MukIcon scale={0.5} icon={'map-marker-outline'} />
          <Text style={{fontSize: responsiveSize(12), fontWeight: 'bold', color: colors.onSurfaceVariant}}>İstanbul,Turkey</Text>
        </View>
      </View>
    </View>
  );
}

import {FlatList, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Card, Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukProfileButton from '../custom/MukProfileButton';
import MukChip from '../custom/MukChip';
import {useState} from 'react';
import MukIcon from '../custom/MukIcon';

const profileData = [
  {
    count: '140k',
    title: 'Oylama',
  },
  {
    count: '31k',
    title: 'Takipçi',
  },
  {
    count: '62k',
    title: 'Takip edilen',
  },
];

const profileInfo = [
  {
    data: 'Galatasaray',
  },
  {
    data: 'Rap',
  },
];

const chipData = [
  {
    icon: 'music-box',
    categories: 'Rap',
  },
  {
    icon: 'music-box',
    categories: 'R&B',
  },
  {
    icon: 'music-box',
    categories: 'Pop',
  },
  {
    icon: 'music-box',
    categories: 'Kpop',
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

      <View
        style={{
          marginTop: responsiveHeight(5),
          maxHeight: responsiveHeight(80),
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <FlatList
          horizontal
          data={profileData}
          renderItem={item => (
            <View style={{justifyContent: 'center', display: 'flex', margin: responsiveWidth(20)}}>
              <View>
                <MukProfileButton
                  label={item.item.title}
                  labelData={item.item.count}
                  buttonStyle={{height: responsiveHeight(80), backgroundColor: 'transparent', display: 'flex', justifyContent: 'center'}}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <FlatList horizontal data={chipData} renderItem={item => <MukChip mode={'outlined'} icon={item.item.icon} label={item.item.categories} />} />
      </View>
      <View style={{flexDirection: 'column', paddingHorizontal: 10, width: '100%', marginTop: responsiveWidth(10)}}>
        <Text style={{fontSize: responsiveSize(12), fontWeight: 'bold', color: colors.onSurfaceVariant}}>Favori Mekanlar</Text>
        <FlatList
          horizontal
          data={chipData}
          renderItem={item => (
            <Card mode={'elevated'} style={{marginLeft: 15, marginTop: 10}}>
              <Card.Cover style={{height: responsiveHeight(180)}} source={{uri: 'https://picsum.photos/1557'}} />
              <Card.Content style={{width: responsiveWidth(180)}}>
                <Text variant="bodySmall">Card</Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
}

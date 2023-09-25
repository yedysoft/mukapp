import {Pressable, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useState} from 'react';
import MukIcon from '../custom/MukIcon';
import ImagePicker from 'react-native-image-picker';
import {MediaType} from '../../types/MediaType';

const profileInfo = [
  {
    data: 'İstanbul,Turkey',
    imageUri: 'map-marker-outline',
  },
];

export default function HorizontalUser() {
  const [value, setValue] = useState('');
  const {colors} = useTheme();
  const isActive = true;
  const [selectedImage, setSelectedImage] = useState('');
  const mediaType: MediaType = 'photo';
  const [response, setResponse] = useState<any>(null);

  const openImagePicker = () => {
    const options = {
      mediaType: mediaType,
    };

    ImagePicker.launchImageLibrary(options, response => console.log(response))
      .then(r => console.log(r))
      .catch(err => console.log(err));
    //launchImageLibrary(options, setResponse).then(r => console.log(r));
  };

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: responsiveHeight(20), gap: responsiveWidth(5)}}>
      <Pressable onPress={openImagePicker}>
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
      </Pressable>

      <View style={{paddingTop: responsiveHeight(10)}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: responsiveSize(24), fontWeight: 'bold', color: 'white'}}>Ethem Can Aslan</Text>

          {/*<MukIconButton icon={'pencil-outline'} scale={0.4} />*/}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: responsiveSize(12), fontWeight: 'bold', color: colors.onSurfaceVariant}}>{'İstanbul,Türkiye'}</Text>
          <MukIcon iconStyle={{marginLeft: responsiveHeight(0)}} scale={0.3} icon={'map-marker-outline'} />
        </View>
      </View>
    </View>
  );
}

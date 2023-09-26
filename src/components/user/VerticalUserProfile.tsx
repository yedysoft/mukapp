import {Pressable, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Portal, Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useState} from 'react';
import MukIcon from '../custom/MukIcon';
import * as ImagePicker from 'expo-image-picker';
import MukModal from '../custom/MukModal';
import MukIconButton from '../custom/MukIconButton';

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
  const [isVisible, setVisible] = useState(false);
  const [image, setImage] = useState(
    'https://static.wikia.nocookie.net/sungerbob-karepantolon/images/8/86/Patrick-star-yildiz-sunger-bob-izle.png/revision/latest?cb=20140905123018&path-prefix=tr',
  );

  const pickImage = async () => {
    setVisible(false);

    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  };

  const takePhoto = async () => {
    setVisible(false);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  };

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: responsiveHeight(20), gap: responsiveWidth(5)}}>
      <Portal>
        <MukModal backgroundColor={colors.backdrop} visible={isVisible} onDismiss={hideModal}>
          <View style={{width: responsiveWidth(300), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <MukIconButton onPress={() => takePhoto()} icon={'camera'} />
            <MukIconButton onPress={() => pickImage()} icon={'folder-search'} />
          </View>
        </MukModal>
      </Portal>

      <Pressable onPress={showModal}>
        <MukImage
          scale={2.8}
          source={{uri: image}}
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

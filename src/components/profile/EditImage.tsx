import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import MukModal from '../custom/MukModal';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';

type Props = {
  setImage?: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
};

export default function EditImage({setImage, setVisible, isVisible}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();

  const saveImage = async (result: ImagePickerResult) => {
    if (result && !result.canceled) {
      const img = result.assets[0];
      await api.image.save(img.uri, img.fileName);
      setImage && setImage(img.uri);
    }
  };

  const pickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    await saveImage(result);
  };

  const takePhoto = async () => {
    setVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    await saveImage(result);
  };

  return (
    <MukModal visible={isVisible} onDismiss={() => setVisible(false)}>
      <View
        style={{
          width: responsiveWidth(300),
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <MukIconButton onPress={() => takePhoto()} icon={'camera'} />
        <MukIconButton onPress={() => pickImage()} icon={'folder-search'} />
      </View>
    </MukModal>
  );
}

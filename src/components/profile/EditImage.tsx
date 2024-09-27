import {View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import MukModal from '../custom/MukModal';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';
import {useStores} from '../../stores';

type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
  tableName: string;
  tableId: string;
  imageIndex?: string;
  tempId?: string;
};

export default function EditImage({setVisible, isVisible, tableName, tableId, imageIndex, tempId}: Props) {
  const {api} = useServices();
  const {user} = useStores();

  const saveImage = async (result: ImagePickerResult) => {
    if (result && !result.canceled && result.assets[0] && result.assets[0].type === 'image') {
      const img = result.assets[0];
      const uploadedImage = await api.image.save(img.uri, img.fileName, tableName, tableId, imageIndex, tempId);
      if (uploadedImage) {
        user.set('info', i => ({...i, image: uploadedImage}));
      }
    }
  };

  const pickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [3, 4],
      allowsEditing: true,
      quality: 0.1,
    });
    await saveImage(result);
  };

  const takePhoto = async () => {
    setVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [3, 4],
      allowsEditing: true,
      quality: 0.1,
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
        <MukIconButton onPress={takePhoto} icon={'camera'} />
        <MukIconButton onPress={pickImage} icon={'folder'} />
      </View>
    </MukModal>
  );
}

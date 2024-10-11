import {View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';
import {IImage} from '../../types/user';
import YedyModal from '../custom/YedyModal';

export type IEditImage = {
  tableName: string;
  tableId: string;
  imageIndex?: string;
  tempId?: string;
  setImage: (image: IImage) => void;
};

type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
  edit: IEditImage;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function EditImage({setVisible, isVisible, edit, setLoading}: Props) {
  const {api} = useServices();

  const saveImage = async (result: ImagePickerResult) => {
    try {
      setLoading(true);
      if (result && !result.canceled && result.assets[0] && result.assets[0].type === 'image') {
        const img = result.assets[0];
        const uploadedImage = await api.image.save(
          img.uri,
          img.fileName,
          edit.tableName,
          edit.tableId,
          edit.imageIndex,
          edit.tempId,
        );
        if (uploadedImage) {
          edit.setImage(uploadedImage);
        }
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.3,
    });
    await saveImage(result);
  };

  const takePhoto = async () => {
    setVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.3,
    });
    await saveImage(result);
  };

  return (
    <YedyModal visible={isVisible} changeVisible={() => setVisible(false)}>
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
    </YedyModal>
  );
}

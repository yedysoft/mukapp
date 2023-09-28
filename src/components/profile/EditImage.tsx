import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';
import {Dispatch, SetStateAction} from 'react';
import * as ImagePicker from 'expo-image-picker';
import MukModal from '../custom/MukModal';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';

type Props = {
  setImage: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean
}

export default function EditImage({setImage, setVisible, isVisible}: Props) {
  const {colors} = useTheme();
  const {api, t} = useServices();

  const pickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result && result.assets) {
      const img = result.assets[0];
      await api.image.save(img.uri, img.fileName);
    }
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

  return (
    <MukModal backgroundColor={colors.backdrop} visible={isVisible} onDismiss={hideModal}>
      <View style={{width: responsiveWidth(300), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <MukIconButton onPress={() => takePhoto()} icon={'camera'}/>
        <MukIconButton onPress={() => pickImage()} icon={'folder-search'}/>
      </View>
    </MukModal>
  );
}

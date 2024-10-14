import {View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import {useServices} from '../../services';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';
import {IImage} from '../../types/user';
import YedyModal from '../custom/YedyModal';
import {ModalScreenProps, MukTheme} from '../../types';
import MukIcon from '../custom/MukIcon';
import {responsiveWidth} from '../../utils/util';
import MukButton from '../custom/MukButton';
import React from 'react';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useStores} from '../../stores';

export type IEditImage = {
  id?: string;
  tableName: string;
  tableId: string;
  imageIndex?: string;
  tempId?: string;
  setImage: (image: IImage) => void;
};

const EditImage = observer(({visible, changeVisible, data}: ModalScreenProps) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {loading} = useStores();

  const saveImage = async (result: ImagePickerResult) => {
    try {
      data.setLoading(true);
      if (result && !result.canceled && result.assets[0] && result.assets[0].type === 'image') {
        const img = result.assets[0];
        const uploadedImage = await api.image.save(
          img.uri,
          img.fileName,
          data.edit.tableName,
          data.edit.tableId,
          data.edit.imageIndex,
          data.edit.tempId,
        );
        if (uploadedImage) {
          data.edit.setImage(uploadedImage);
        }
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      data.setLoading(false);
    }
  };

  const pickImage = async () => {
    changeVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.3,
    });
    await saveImage(result);
  };

  const takePhoto = async () => {
    changeVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.3,
    });
    await saveImage(result);
  };

  const deleteImage = async () => {
    const deleted = await api.image.delete(data.edit.id);
    if (deleted) {
      changeVisible(false);
      data.edit.setImage(null);
    }
  };

  return (
    <YedyModal visible={visible} changeVisible={changeVisible}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: responsiveWidth(16),
          alignItems: 'flex-start',
        }}
      >
        <MukButton
          disabled={loading.deleteImage}
          buttonStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary}}
          onPress={takePhoto}
          label={'Fotoğraf Çek'}
        >
          <MukIcon icon="camera" scale={0.6} color={colors.primary} />
        </MukButton>
        <MukButton
          disabled={loading.deleteImage}
          buttonStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary}}
          onPress={pickImage}
          label={'Fotoğraflarımdan Seç'}
        >
          <MukIcon icon="image" scale={0.6} color={colors.info} />
        </MukButton>
        <MukButton
          loading={loading.deleteImage}
          visible={!!data.edit.id}
          buttonStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary}}
          onPress={deleteImage}
          label={'Fotoğrafı Kaldır'}
        >
          <MukIcon icon="image" scale={0.6} color={colors.error} />
        </MukButton>
      </View>
    </YedyModal>
  );
});

export default (props: ModalScreenProps) => <EditImage {...props} />;

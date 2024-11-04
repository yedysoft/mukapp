import {View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import {useServices} from '../../../services';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';
import {IImage} from '../../../types/user';
import YedyButton from '../YedyButton';
import YedyModal from '../YedyModal';
import YedyIcon from '../YedyIcon';
import {ModalScreenProps} from '../../../types';
import {responsiveSize, responsiveWidth} from '../../../utils/util';
import React from 'react';
import {observer} from 'mobx-react';
import {useTheme} from '../../../hooks';
import {useStores} from '../../../stores';

export type IEditImage = {
  id?: string;
  tableName: string;
  tableId: string;
  imageIndex?: string;
  tempId?: string;
  setImage: (image: IImage) => void;
};

const YedyEditImage = observer(({visible, changeVisible, data}: ModalScreenProps) => {
  const {colors} = useTheme();
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
          alignItems: 'flex-start',
          padding: responsiveWidth(16),
          gap: responsiveWidth(4),
        }}
      >
        <YedyButton
          disabled={loading.deleteImage}
          buttonStyle={{
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary, fontSize: responsiveSize(15)}}
          onPress={takePhoto}
          label={'Fotoğraf Çek'}
        >
          <YedyIcon icon={'camera'} scale={0.4} color={colors.primary} />
        </YedyButton>
        <YedyButton
          disabled={loading.deleteImage}
          buttonStyle={{
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary, fontSize: responsiveSize(15)}}
          onPress={pickImage}
          label={'Fotoğraflarımdan Seç'}
        >
          <YedyIcon icon={'file-image-plus'} scale={0.4} color={colors.info} />
        </YedyButton>
        <YedyButton
          loading={loading.deleteImage}
          visible={!!data.edit.id}
          buttonStyle={{
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 0,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          textStyle={{color: colors.secondary, fontSize: responsiveSize(15)}}
          onPress={deleteImage}
          label={'Fotoğrafı Kaldır'}
        >
          <YedyIcon icon={'file-image-remove'} scale={0.4} color={colors.error} />
        </YedyButton>
      </View>
    </YedyModal>
  );
});

export default (props: ModalScreenProps) => <YedyEditImage {...props} />;

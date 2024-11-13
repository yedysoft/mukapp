import {View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useServices} from '../../../services';
import {ImagePickerResult} from 'expo-image-picker/src/ImagePicker.types';
import YedyButton from '../../custom/YedyButton';
import YedyModal from '../../custom/YedyModal';
import YedyIcon from '../../custom/YedyIcon';
import {responsiveSize, responsiveWidth} from '../../../utils/util';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {observer} from 'mobx-react';
import {useTheme} from '../../../hooks';
import {useStores} from '../../../stores';
import {YedyPopupScreenRef} from '../../../types';

export default observer(
  forwardRef<YedyPopupScreenRef>((_props, ref) => {
    const {colors} = useTheme();
    const {api} = useServices();
    const {loading} = useStores();
    const [params, setParams] = useState<{visible: boolean; data?: any}>({visible: false, data: {}});

    const changeVisible = (open: boolean, data?: any) => {
      setParams(p => ({visible: open, data: open && data ? data : p.data}));
    };

    useImperativeHandle(ref, () => ({
      open: data => changeVisible(true, data),
      close: () => changeVisible(false),
    }));

    const saveImage = async (result: ImagePickerResult) => {
      try {
        params.data.setLoading(true);
        if (result && !result.canceled && result.assets[0] && result.assets[0].type === 'image') {
          const img = result.assets[0];
          const uploadedImage = await api.image.save(
            img.uri,
            img.fileName,
            params.data.edit.tableName,
            params.data.edit.tableId,
            params.data.edit.imageIndex,
            params.data.edit.tempId,
          );
          if (uploadedImage) {
            params.data.edit.setImage(uploadedImage);
          }
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        params.data.setLoading(false);
      }
    };

    const pickImage = async () => {
      changeVisible(false);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.3,
      });
      await saveImage(result);
    };

    const takePhoto = async () => {
      changeVisible(false);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.3,
      });
      await saveImage(result);
    };

    const deleteImage = async () => {
      const deleted = await api.image.delete(params.data.edit.id);
      if (deleted) {
        changeVisible(false);
        params.data.edit.setImage(null);
      }
    };

    return (
      <YedyModal visible={params.visible} changeVisible={changeVisible}>
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
            visible={!!params.data.edit?.id}
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
  }),
);

import axiosIns from '../axiosIns';
import {IImage} from '../../types/user';
import {stores} from '../../stores';

class ImageApi {
  save = async (
    imageUri: string,
    fileName: string | null | undefined,
    tableName: string,
    tableId: string,
    imageIndex?: string,
    tempId?: string,
  ): Promise<IImage | undefined> => {
    let image: IImage | undefined;
    try {
      const form = new FormData();
      form.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName ?? 'image.jpg',
      } as any);
      form.append('tableName', tableName);
      form.append('tableId', tableId);
      imageIndex && form.append('temp1', imageIndex);
      tempId && form.append('tempId', tempId);
      const response = await axiosIns.post<IImage>('/file/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        image = response.data;
      }
    } catch (e) {
      console.log(e);
    }
    return image;
  };

  delete = async (id: string): Promise<boolean> => {
    let isDeleted = false;
    try {
      stores.loading.set('deleteImage', true);
      const response = await axiosIns.delete<IImage>(`/file/deleteFile/${id}`);
      isDeleted = response.status === 200;
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('deleteImage', false);
    }
    return isDeleted;
  };
}

const image = new ImageApi();
export default image;

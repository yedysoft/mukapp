import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {IImage} from '../../types/user';

class ImageApi {
  async save(
    imageUri: string,
    fileName: string | null | undefined,
    imageIndex: string | null,
    tempId: string | null,
  ): Promise<IImage | undefined> {
    let image: IImage | undefined;
    try {
      const form = new FormData();
      form.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName ?? 'image.jpg',
      } as any);
      form.append('tableName', 'S_USER');
      form.append('tableId', stores.user.info.id);
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
  }

  async delete(id: string): Promise<boolean> {
    let isDeleted = false;
    try {
      const response = await axiosIns.delete<IImage>(`/file/deleteFile/${id}`);
      isDeleted = response.status === 200;
    } catch (e) {
      console.log(e);
    }
    return isDeleted;
  }
}

const image = new ImageApi();
export default image;

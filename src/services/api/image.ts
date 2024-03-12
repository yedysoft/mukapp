import axiosIns from '../axiosIns';
import {PVoid} from '../../types';
import {stores} from '../../stores';

class ImageApi {
  async save(imageUri: string, fileName: string | null | undefined): PVoid {
    try {
      const form = new FormData();
      form.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName ?? 'image.jpg',
      } as any);
      form.append('tableName', 'S_USER');
      form.append('tableId', stores.user.getInfo.id);
      await axiosIns.post('/file/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const image = new ImageApi();
export default image;

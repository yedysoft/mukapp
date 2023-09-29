import axiosIns from '../axiosIns';

export class ImageApi {
  async save(imageUri: string, fileName: string | null | undefined): PVoid {
    try {
      const form = new FormData();
      const response = await fetch(imageUri);
      const blob = await response.blob();
      console.log(response);
      console.log(blob);
      form.append('file', blob, fileName || 'test.jpg');
      await axiosIns.post('/image/upload', form, {
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

import axiosIns from '../axiosIns';

export class ImageApi {
  async save(file: FormData): PVoid {
    try {
      console.log(file);
      await axiosIns.post('/image/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const imageApi = new ImageApi();
export default imageApi;

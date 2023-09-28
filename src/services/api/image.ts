import axiosIns from "../axiosIns";

export class ImageApi{

    async save(file: FormData): PVoid {
        try {
            const response = await axiosIns.post('/image/save', file);
        } catch (e) {
            console.log(e);
        }
    }
}

const imageApi = new ImageApi();
export default imageApi;
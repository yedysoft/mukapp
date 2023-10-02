export class RoomConfigApi {
  async createRoom(): PVoid {
    try {
      await this.openRoom('', '');
    } catch (e) {
      console.log(e);
    }
  }
}

const roomConfig = new RoomConfigApi();
export default roomConfig;

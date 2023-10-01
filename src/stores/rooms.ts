import {BaseStore} from './base';
import {IRoom} from '../types/room';

export class RoomsStore extends BaseStore<RoomsStore> {
  places: IRoom[] = [];
  users: IRoom[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, RoomsStore.name, []);
  }

  get getPlaces() {
    return this.places;
  }

  get getUsers() {
    return this.users;
  }
}

const rooms = new RoomsStore();
export default rooms;

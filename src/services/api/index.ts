import helper from './helper';
import socket from './socket';
import auth from './auth';
import user from './user';
import media from './media';
import subscription from './subscription';
import image from './image';
import room from './room';
import chat from './chat';
import permission from './permission';
import {IService, PVoid} from '../../types';

class ApiService implements IService {
  private inited = false;

  helper = helper;
  socket = socket;
  auth = auth;
  user = user;
  media = media;
  subscription = subscription;
  image = image;
  room = room;
  chat = chat;
  permission = permission;

  async init(): PVoid {
    if (!this.inited) {
      this.inited = true;
    }
  }
}

const api = new ApiService();
export default api;

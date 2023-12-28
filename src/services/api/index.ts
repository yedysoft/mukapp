import auth, {AuthApi} from './auth';
import socket, {SocketApi} from './socket';
import helper, {HelperApi} from './helper';
import user, {UserApi} from './user';
import media, {MediaApi} from './media';
import subscription, {SubscriptionApi} from './subscription';
import image, {ImageApi} from './image';
import room, {RoomApi} from './room';
import chat, {ChatApi} from './chat';
import permission, {PermissionApi} from './permission';
import {IService, PVoid} from '../../types';

export class ApiService implements IService {
  private inited = false;

  helper: HelperApi;
  socket: SocketApi;
  auth: AuthApi;
  user: UserApi;
  media: MediaApi;
  subscription: SubscriptionApi;
  image: ImageApi;
  room: RoomApi;
  chat: ChatApi;
  permission: PermissionApi;

  constructor() {
    this.socket = socket;
    this.helper = helper;
    this.auth = auth;
    this.user = user;
    this.media = media;
    this.subscription = subscription;
    this.image = image;
    this.room = room;
    this.chat = chat;
    this.permission = permission;
  }

  async init(): PVoid {
    if (!this.inited) {
      this.inited = true;
    }
  }
}

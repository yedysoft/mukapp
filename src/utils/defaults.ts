import {IPlayingTrack} from '../types/media';
import {IInfo} from '../types/user';
import {Positions} from '../types';
import {IChat, IGroup, IMessage} from '../types/chat';
import {NotificationCategory} from 'expo-notifications/src/Notifications.types';
import {INotificationType} from '../types/enums';
import {IServer} from '../types/main';
import {IRoomConfig} from '../types/room';

class Defaults {
  playingTrack: IPlayingTrack = {
    id: '',
    uri: '',
    name: '',
    artists: [],
    images: [],
    duration: 0,
    progress: 0,
    isPlaying: false,
    dominantColor: undefined,
    voteable: false,
  };

  chat: IChat = {
    id: 'default',
    name: '',
    type: 'PRIVATE',
    typing: false,
    messages: [],
  };

  info: IInfo = {
    id: 'default',
    userName: '',
    image: null,
    name: '',
    coin: 0,
    token: 0,
    birthday: null,
    gender: null,
    isFollows: false,
    isFollower: false,
  };

  server: IServer = {
    id: 'default',
    link: '',
  };

  group: IGroup = {
    id: 'default',
    name: '',
    users: [],
  };

  positions: Positions = {
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  };

  message: IMessage = {
    id: '',
    tempId: '',
    senderId: '',
    receiverId: '',
    date: new Date(),
    content: '',
    contentType: 'TEXT',
    type: 'PUBLIC',
  };

  config: IRoomConfig = {
    id: '',
    roomId: '',
    name: '',
    image: null,
  };

  get getNotificationCategories(): NotificationCategory[] {
    return [
      {
        identifier: 'Follow' as INotificationType,
        actions: [
          {identifier: 'accept', buttonTitle: 'Kabul Et', options: {opensAppToForeground: false}},
          {identifier: 'reject', buttonTitle: 'Reddet', options: {opensAppToForeground: false}},
        ],
      },
      {
        identifier: 'Message' as INotificationType,
        actions: [
          {
            identifier: 'answer',
            buttonTitle: 'Cevapla',
            textInput: {submitButtonTitle: 'Gönder', placeholder: 'Mesaj girin...'},
            options: {opensAppToForeground: false},
          },
          {identifier: 'readed', buttonTitle: 'Okundu Olarak İşaretle', options: {opensAppToForeground: false}},
        ],
      },
    ];
  }
}

const defaults = new Defaults();
export default defaults;

import {IPlayingTrack} from '../types/media';
import {IInfo} from '../types/user';
import {Positions} from '../types';
import {IGroup, IMessage} from '../types/chat';
import {NotificationCategory} from 'expo-notifications/src/Notifications.types';
import {INotificationType} from '../types/enums';
import {IServer} from '../types/main';

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
    dominantColor: null,
    voteable: false,
  };

  info: IInfo = {
    id: 'default',
    userName: '',
    image: '',
    name: '',
    surname: '',
    coin: 0,
    token: 0,
    birthday: null,
    gender: null,
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

  positions: Positions = {width: 0, height: 0, pageX: 0, pageY: 0};

  message: IMessage = {
    id: '',
    tempId: '',
    senderId: '',
    receiverId: '',
    date: new Date(),
    content: '',
    contentType: 'Text',
    type: 'Public',
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
    ];
  }
}

const defaults = new Defaults();
export default defaults;

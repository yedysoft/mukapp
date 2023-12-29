import {IPlayingTrack} from '../types/media';
import {IInfo} from '../types/user';
import {Positions} from '../types';
import {IMessage} from '../types/chat';
import {NotificationCategory} from 'expo-notifications/src/Notifications.types';
import {INotificationType} from '../types/enums';
import {services} from '../services';

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
    dominantColor: '',
    voteable: false,
  };

  info: IInfo = {
    id: '',
    userName: '',
    image: '',
    name: '',
    surname: '',
    coin: 0,
    token: 0,
    birthday: null,
    gender: null,
  };

  positions: Positions = {width: 0, height: 0, pageX: 0, pageY: 0};

  message: IMessage = {
    id: '',
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
          {identifier: 'accept', buttonTitle: services.t.do('notifications.accept')},
          {identifier: 'reject', buttonTitle: services.t.do('notifications.reject')},
        ],
      },
    ];
  }
}

const defaults = new Defaults();
export default defaults;

import {IMessage} from 'react-native-gifted-chat';
import {MessageType} from './enums';

export type IInfo = {
  id: string | null;
  userName: string;
  image: string;
  name: string;
  surname: string;
  coin: number;
  token: number;
};

export type IChat = {
  id: string;
  name: string;
  type: MessageType;
  messages: IMessage[];
};

export type ILastMessage = {
  message: string;
  date: Date | number;
};

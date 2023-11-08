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

export type IFollowUser = {
  userName: string;
  imagePath: string;
  name: string;
  surname: string;
  userId: string;
};

export type IFollowRequest = {
  requestId: string;
  userName: string;
};

export type IBlockedUser = {
  blockId: string;
  blockedUserId: string;
  userName: string;
  imgPath: string;
};

export type ISearchUser = {
  id: string;
  image: string;
  name: string;
  surname: string;
  userName: string;
  isFollower: boolean;
  isFollows: boolean;
};

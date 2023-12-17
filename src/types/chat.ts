import {IMessageContentType, IMessageType} from './enums';

export type IChat = {
  id: string;
  name: string;
  type: 'group' | 'private';
  messages: IMessage[];
};

export type IMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  date: Date;
  content: string;
  contentType: IMessageContentType;
  type: IMessageType;
  quotedMessageId?: string;
};

export type ILastMessage = {
  date: Date;
  message: string;
};

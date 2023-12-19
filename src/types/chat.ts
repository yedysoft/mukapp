import {IChatType, IContentType, IMessageType, IUserAuthority} from './enums';

export type IChat = {
  id: string;
  name: string;
  type: IChatType;
  messages: IMessage[];
};

export type IMessage = {
  id: string;
  senderId: string;
  senderName?: string;
  groupName?: string;
  receiverId: string;
  date: string | Date;
  content: string;
  contentType: IContentType;
  type: IMessageType;
  quotedMessageId?: string;
};

export type ILastMessage = {
  date: string | Date;
  message: string;
};

export type IGroupPost = {
  name: string;
};

export type IGroup = {
  id: string;
  name: string;
  users: IGroupUser[];
};

export type IGroupUser = {
  id: string;
  authority: IUserAuthority;
};

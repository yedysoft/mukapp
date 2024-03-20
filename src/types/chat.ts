import {IChatType, IContentType, IMessageType, IUserAuthority} from './enums';

export type IChat = {
  id: string;
  name: string;
  type: IChatType;
  typing: boolean | ITypingUser[];
  messages: IMessage[];
};

export type ITypingUser = {
  id: string;
  typing: boolean;
};

export type IMessageTyping = {
  senderId: string;
  receiverId: string;
  typing: boolean;
  type: IMessageType;
};

export type IMessage = {
  id: string;
  tempId: string;
  senderId: string;
  receiverId: string;
  date: string | Date;
  content: string;
  contentType: IContentType;
  type: IMessageType;
  quotedMessageId?: string;
};

export type IQuotedMessage = {
  id: string;
  senderId: string;
  content: string;
};

export type ILastMessage = {
  date: string | Date;
  message: string;
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

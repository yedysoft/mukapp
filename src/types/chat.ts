export type IChat = {
  id: string;
  name: string;
  type: 'Private' | 'Group';
  messages: IMessage[];
};

export type IMessage = {
  id: string;
  senderId: string;
  senderName?: string;
  receiverId: string;
  date: Date;
  content: string;
  contentType: 'Text' | 'Picture' | 'Video' | 'Link' | 'File';
  type: 'Public' | 'Private' | 'Group';
  quotedMessageId?: string;
};

export type ILastMessage = {
  date: Date;
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
  authority: 'Admin' | 'User';
};

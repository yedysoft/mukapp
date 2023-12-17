export type IChat = {
  id: string;
  name: string;
  type: 'Private' | 'Group';
  messages: IMessage[];
};

export type IMessage = {
  id: string;
  senderId: string;
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

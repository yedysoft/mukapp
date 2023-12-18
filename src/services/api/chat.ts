import {IChat, IGroupPost, ILastMessage, IMessage} from '../../types/chat';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class ChatApi {
  async createGroup(group: IGroupPost): Promise<IChat | null> {
    let chat: IChat | null = null;
    try {
      const response = await axiosIns.post('/message-group/createGroup', group);
      chat = response.data;
      if (chat) {
        stores.user.set('chats', [...stores.user.getChats, chat]);
      }
    } catch (e: any) {
      console.log(e);
    }
    return chat;
  }

  getLastMessage(messages: IMessage[]): ILastMessage {
    let message: IMessage | null = null;
    if (messages && messages.length > 0) {
      messages.sort((a, b) => b.date.getTime() - a.date.getTime());
      message = messages[0];
    }
    return message
      ? {date: message.date, message: this.getMessageByContentType(message.content, message.contentType)}
      : {date: new Date(), message: ''};
  }

  private getMessageByContentType(content: string, contentType: 'Text' | 'Picture' | 'Video' | 'Link' | 'File') {
    if (contentType === 'Picture') {
      return 'Resim';
    }
    if (contentType === 'Video') {
      return 'Video';
    }
    if (contentType === 'File') {
      return 'Dosya';
    }
    return content;
  }
}

const chat = new ChatApi();
export default chat;

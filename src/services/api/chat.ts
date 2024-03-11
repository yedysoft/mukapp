import {IChat, IGroup, ILastMessage, IMessage} from '../../types/chat';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {IContentType} from '../../types/enums';
import {PVoid} from '../../types';

class ChatApi {
  async createGroup(group: IGroup): Promise<IChat | null> {
    let chat: IChat | null = null;
    try {
      const response = await axiosIns.post<IChat>('/message-group/createGroup', group);
      chat = response.data;
      if (chat) {
        stores.user.set('chats', [...stores.user.getChats, chat]);
      }
    } catch (e: any) {
      console.log(e);
    }
    return chat;
  }

  async getChats(): PVoid {
    try {
      stores.loading.set('chats', true);
      const response = await axiosIns.get<IChat[]>('/message/getChats');
      stores.user.set('chats', response.data);
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('chats', false);
    }
  }

  getLastMessage(messages: IMessage[]): ILastMessage {
    let message: IMessage | null = null;
    const temp = [...messages];
    if (messages && messages.length > 0) {
      temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      message = temp[0];
    }
    return message
      ? {date: message.date, message: this.getMessageByContentType(message.content, message.contentType)}
      : {date: '', message: ''};
  }

  private getMessageByContentType(content: string, contentType: IContentType) {
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

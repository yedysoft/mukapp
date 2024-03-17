import {IChat, IGroup, ILastMessage, IMessage} from '../../types/chat';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
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
      const response = await axiosIns.get<IChat[]>('/message/getChats');
      if (response.status === 200) {
        stores.user.set('chats', response.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  getLastMessage(messages: IMessage[]): ILastMessage {
    let message: IMessage | null = null;
    if (messages && messages.length > 0) {
      const temp = [...messages];
      temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      message = temp[0];
    }
    return message ? {date: message.date, message: this.getMessageByContentType(message)} : {date: '', message: ''};
  }

  private getMessageByContentType(message: IMessage) {
    const me = message.senderId === stores.user.getInfo.id;
    const sended = !!message.id;
    let m = message.content;
    if (message.contentType === 'Picture') {
      m = 'Resim';
    } else if (message.contentType === 'Video') {
      m = 'Video';
    } else if (message.contentType === 'File') {
      m = 'Dosya';
    }
    return `${me ? (sended ? '✓' : '⏳') : ''} ${m}`;
  }
}

const chat = new ChatApi();
export default chat;

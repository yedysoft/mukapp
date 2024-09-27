import {IChat, IGroup, ILastMessage, IMessage, ITypingUser} from '../../types/chat';
import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {PVoid} from '../../types';
import translate from '../translate';
import main from './main';

class ChatApi {
  createGroup = async (group: IGroup): Promise<IChat | null> => {
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
  };

  getChats = async (): PVoid => {
    try {
      const response = await axiosIns.get<IChat[]>('/message/getChats');
      if (response.status === 200) {
        stores.user.set('chats', response.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  getLastMessage = (messages: IMessage[]): ILastMessage => {
    let message: IMessage | null = null;
    if (messages && messages.length > 0) {
      const temp = [...messages];
      temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      message = temp[0];
    }
    return message ? {date: message.date, message: this.getMessageByContentType(message)} : {date: '', message: ''};
  };

  getTyping = (chat: IChat) => {
    if (chat.typing) {
      if (typeof chat.typing === 'boolean') {
        return translate.do('main.social.typing');
      } else {
        const users: ITypingUser[] = chat.typing.filter(u => u.typing);
        if (users && users.length > 0) {
          console.log(users);
          const ids = users.map(u => u.id);
          const infos = stores.main.infos.filter(i => ids.includes(i.id));
          main.getInfoByIds(ids.filter(id => !infos.some(i => i.id === id)));
          return `${infos.map(i => i.name).join(', ')} ${translate.do('main.social.typing')}`;
        } else {
          return '';
        }
      }
    } else {
      return '';
    }
  };

  private getMessageByContentType = (message: IMessage) => {
    const me = message.senderId === stores.user.getInfo.id;
    const sended = !!message.id;
    let m = message.content;
    if (message.contentType === 'PICTURE') {
      m = 'Resim';
    } else if (message.contentType === 'VIDEO') {
      m = 'Video';
    } else if (message.contentType === 'FILE') {
      m = 'Dosya';
    }
    return `${me ? (sended ? '✓ ' : '⏳ ') : ''}${m}`;
  };
}

const chat = new ChatApi();
export default chat;

import {ILastMessage, IMessage} from '../../types/chat';

export class ChatApi {
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

import {ILastMessage, IMessage} from '../../types/chat';
import {IMessageContentType} from '../../types/enums';

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

  private getMessageByContentType(content: string, contentType: IMessageContentType) {
    if (contentType === IMessageContentType.Picture) {
      return 'Resim';
    }
    if (contentType === IMessageContentType.Video) {
      return 'Video';
    }
    if (contentType === IMessageContentType.File) {
      return 'Dosya';
    }
    return content;
  }
}

const chat = new ChatApi();
export default chat;

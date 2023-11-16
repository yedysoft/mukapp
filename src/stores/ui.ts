import {Appearance, Language} from '../types/enums';
import {BaseStore} from './base';
import {StatusBarStyle} from 'expo-status-bar';
import themes from '../themes';
import {MessageBody, MukMessage, MukTheme} from '../types';

export class UIStore extends BaseStore<UIStore> {
  id = 0;
  systemScheme: 'light' | 'dark' = 'dark';
  appearance: Appearance = 'system';
  language: Language = 'system';
  messages: MukMessage[] = [];
  expoToken = '';

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UIStore.name, ['systemScheme', 'appearance', 'language', 'expoToken']);
  }

  get isLanguageSystem() {
    return this.language === 'system';
  }

  get getScheme(): 'light' | 'dark' {
    return this.appearance === 'system' ? this.systemScheme : this.appearance;
  }

  get getStatusBarStyle(): StatusBarStyle {
    return this.getScheme === 'light' ? 'dark' : 'light';
  }

  get getTheme(): MukTheme {
    return themes[this.getScheme];
  }

  get getExpoToken() {
    return this.expoToken;
  }

  get getMessages() {
    return this.messages;
  }

  addMessage(body: MessageBody) {
    this.set('messages', [...this.messages, {id: this.id++, body: body}]);
  }

  addError(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'error'});
  }

  addWarning(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'warning'});
  }

  addInfo(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'info'});
  }

  delMessage(id: number) {
    this.set(
      'messages',
      this.messages.filter(e => e.id !== id),
    );
  }
}

const ui = new UIStore();
export default ui;

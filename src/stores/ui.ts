import {IAppearance, ILanguage} from '../types/enums';
import {BaseStore} from './base';
import {StatusBarStyle} from 'expo-status-bar';
import themes from '../themes';
import {MessageBody, MukMessage, MukTheme} from '../types';
import {Dimensions, ScaledSize} from 'react-native';

class UIStore extends BaseStore<UIStore> {
  id = 0;
  systemScheme: 'light' | 'dark' = 'dark';
  systemLanguage = 'tr';
  appearance: IAppearance = 'system';
  language: ILanguage = 'system';
  messages: MukMessage[] = [];
  expoToken: string | null = null;
  reloadToggle = false;
  window: ScaledSize = Dimensions.get('window');
  screen: ScaledSize = Dimensions.get('screen');
  keyboardHeight = 0;
  pickerViewVisible = false;

  //TODO geçici eklendi
  name = '';
  pass = '';

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UIStore.name, ['appearance', 'language', 'name', 'pass']);
  }

  get getScheme(): 'light' | 'dark' {
    return this.appearance === 'system' ? this.systemScheme : this.appearance;
  }

  get getLanguage(): string {
    return this.language === 'system' ? this.systemLanguage : this.language;
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
    return this.messages.slice(0, 3);
  }

  get getReloadToggle(): boolean {
    return this.reloadToggle;
  }

  get screenWidth() {
    return this.screen.width;
  }

  get screenHeight() {
    return this.screen.height;
  }

  get windowWidth() {
    return this.window.width;
  }

  get windowHeight() {
    return this.window.height;
  }

  addMessage(body: MessageBody, interval = 2000) {
    this.set('messages', v => [...v, {id: this.id++, interval: interval, body: body}]);
  }

  addError(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'ERROR'}, 3000);
  }

  addWarning(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'WARNING'}, 2000);
  }

  addInfo(message: string, code?: number) {
    this.addMessage({code: code ?? 0, message: message, type: 'INFO'}, 2000);
  }

  delMessage(id: number) {
    this.set('messages', v => v.filter(e => e.id !== id));
  }

  toggleReload() {
    this.set('reloadToggle', v => !v);
  }
}

const ui = new UIStore();
export default ui;

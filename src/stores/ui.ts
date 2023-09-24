import {Appearance, Language} from '../types/enums';
import {BaseStore} from './base';
import {StatusBarStyle} from 'expo-status-bar';

export class UIStore extends BaseStore<UIStore> {
  appearance: Appearance = 'system';
  language: Language = 'system';

  constructor() {
    super();
    this.makeObservableAndPersistable(this, UIStore.name, ['appearance', 'language']);
  }

  get isAppearanceSystem() {
    return this.appearance === 'system';
  }

  get isLanguageSystem() {
    return this.language === 'system';
  }

  get getStatusBarStyle(): StatusBarStyle {
    return 'light';
  }
}

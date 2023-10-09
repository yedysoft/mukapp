import {Appearance, Language} from '../types/enums';
import {BaseStore} from './base';
import {StatusBarStyle} from 'expo-status-bar';
import {CombinedDarkTheme, CombinedLightTheme} from '../theme';

export class UIStore extends BaseStore<UIStore> {
  id = 0;
  appearance: Appearance = 'system';
  language: Language = 'system';
  errors: ErrorMessage[] = [];

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
    return this.appearance === 'light' ? 'dark' : 'light';
  }

  get getTheme() {
    return this.appearance === 'light' ? CombinedLightTheme : CombinedDarkTheme;
  }

  get getErrors() {
    return this.errors;
  }

  addErrors(error: ErrorBody) {
    this.set('errors', [...this.errors, {id: this.id++, error: error}]);
  }

  delError(id: number) {
    this.set(
      'errors',
      this.errors.filter(e => e.id !== id),
    );
  }
}

const ui = new UIStore();
export default ui;

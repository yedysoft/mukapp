import {Appearance, Language} from '../types/enums';
import {BaseStore} from './base';
import {StatusBarStyle} from 'expo-status-bar';
import {CombinedDarkTheme, CombinedLightTheme} from '../theme';
import helper from '../services/api/helper';

export class UIStore extends BaseStore<UIStore> {
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
    this.set('errors', [...this.errors, {id: helper.generateId(), error: error}]);
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

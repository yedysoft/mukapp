import {getLocales} from 'expo-localization';
import {I18n, TranslateOptions} from 'i18n-js';
import * as translations from './translations';
import {IService, MukLangPaths, PVoid} from '../../types';
import {ILanguage} from '../../types/enums';
import ui from '../../stores/ui';

class TranslateService implements IService {
  private inited = false;
  private i18n = new I18n(translations);

  async init(): PVoid {
    if (!this.inited) {
      this.setup();
      this.inited = true;
    }
  }

  do(scope: MukLangPaths, options?: TranslateOptions | undefined) {
    return this.i18n.t(scope, options);
  }

  setup(language?: ILanguage): void {
    if (language) {
      ui.set('language', language);
    }
    ui.set('systemLanguage', getLocales()[0].languageCode ?? 'tr');
    this.i18n.enableFallback = true;
    this.i18n.locale = ui.getLanguage;
  }
}

const translate = new TranslateService();
export default translate;

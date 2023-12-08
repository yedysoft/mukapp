import {MainLayout} from '../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import MukPicker from '../../components/custom/MukPicker';
import {_appearances, _languages, IAppearance, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import {TranslateService} from '../../services/translate';

const objectToDict = (object: any, path: string, t: TranslateService) => {
  const dict: Record<string, string> = {};
  Object.keys(object).forEach(k => (dict[k] = t.do(`main.settings.${path}.${k}`)));
  return dict;
};

export const SettingsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const {t} = useServices();

  const ThemeDict = useMemo(() => objectToDict(_appearances, 'theme', t), [ui.getScheme]);
  const LanguageDict = useMemo(() => objectToDict(_languages, 'language', t), [ui.getLanguage]);

  return (
    <MainLayout>
      <MukPicker<string>
        items={ThemeDict}
        name={'appearance'}
        value={ui.appearance}
        onValueChange={(_name, value) => ui.set('appearance', value as IAppearance)}
      />
      <MukPicker<string>
        items={LanguageDict}
        name={'language'}
        value={ui.language}
        onValueChange={(_name, value) => {
          ui.set('language', value as ILanguage);
          t.setup();
        }}
      />
    </MainLayout>
  );
});

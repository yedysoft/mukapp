import {MainLayout} from '../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import MukPicker from '../../components/custom/MukPicker';
import {_appearances, _languages, IAppearance, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import {en} from '../../services/translate/translations';

export const SettingsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const {api, t} = useServices();

  const ThemeArray = useMemo(
    () => Object.keys(_appearances).map((a, _) => t.do(`main.settings.theme.${a}`)),
    [ui.getScheme],
  );

  const LanguageArray = useMemo(
    () => Object.keys(_languages).map((l, _) => t.do(`main.settings.language.${l}`)),
    [ui.getLanguage],
  );

  console.log('ui.getScheme: ', ui.getScheme);
  console.log('ui.getLanguage: ', ui.getLanguage);

  return (
    <MainLayout>
      <MukPicker<string>
        items={ThemeArray}
        name={'appearance'}
        value={ui.getScheme}
        onValueChange={(name, value) =>
          ui.set('appearance', api.helper.getKeyByValue(en.main.settings.theme, value) as IAppearance)
        }
      />
      <MukPicker<string>
        items={LanguageArray}
        name={'language'}
        value={ui.getLanguage}
        onValueChange={(name, value) =>
          ui.set('language', api.helper.getKeyByValue(en.main.settings.language, value) as ILanguage)
        }
      />
    </MainLayout>
  );
});

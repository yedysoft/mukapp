import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import MukPicker from '../../components/custom/MukPicker';
import {_languages, IAppearance, ILanguage} from '../../types/enums';
import {useEffect, useMemo, useState} from 'react';
import MukCard from '../../components/custom/MukCard';
import {responsiveWidth} from '../../utils/util';
import MukSegmented from '../../components/custom/MukSegmented';
import {SubLayout} from '../../components/layouts/SubLayout';

/*const objectToDict = (object: any, path: string, t: TranslateService) => {
  const dict: Record<string, string> = {};
  Object.keys(object).forEach(k => (dict[k] = t.do(`main.settings.${path}.${k}`)));
  return dict;
};*/

export const SettingsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const {t} = useServices();

  const [appearance, setAppearance] = useState<string>(ui.appearance);

  useEffect(() => {
    ui.set('appearance', appearance as IAppearance);
  }, [appearance]);

  //const ThemeDict = useMemo(() => objectToDict(_appearances, 'theme', t), [ui.getScheme, ui.getLanguage]);
  const LanguageDict = useMemo(
    () => ({..._languages, system: t.do('main.settings.language.system')}),
    [ui.getLanguage],
  );

  return (
    <SubLayout style={{gap: responsiveWidth(16), padding: responsiveWidth(16)}}>
      <MukCard title={t.do('main.settings.theme.title')}>
        <MukSegmented
          value={appearance}
          handleChange={setAppearance}
          buttons={[
            {
              value: 'system',
              label: t.do('main.settings.theme.system'),
            },
            {
              value: 'light',
              label: t.do('main.settings.theme.light'),
            },
            {
              value: 'dark',
              label: t.do('main.settings.theme.dark'),
            },
          ]}
        />
        {/*
          <MukPicker<string>
            items={ThemeDict}
            name={'appearance'}
            value={ui.appearance}
            onValueChange={(_name, value) => ui.set('appearance', value as IAppearance)}
          />
        */}
      </MukCard>
      <MukCard title={t.do('main.settings.language.title')}>
        <MukPicker<string>
          items={LanguageDict}
          name={'language'}
          value={ui.language}
          onValueChange={(_name, value) => t.setup(value as ILanguage)}
        />
      </MukCard>
    </SubLayout>
  );
});

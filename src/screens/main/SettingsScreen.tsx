import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import MukPicker from '../../components/custom/MukPicker';
import {_languages, IAppearance, IAuthsType, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import MukCard from '../../components/custom/MukCard';
import {responsiveWidth} from '../../utils/util';
import MukSegmented from '../../components/custom/MukSegmented';
import {SubLayout} from '../../components/layouts/SubLayout';
import MukButton from '../../components/custom/MukButton';
import api from '../../services/api';

const connectedAccounts: Record<string, string> = {SPOTIFY: 'Spotify'};

export const SettingsScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui, auth, loading} = useStores();
  const {t} = useServices();

  const LanguageDict = useMemo(
    () => ({..._languages, system: t.do('main.settings.language.system')}),
    [ui.getLanguage],
  );

  return (
    <SubLayout style={{gap: responsiveWidth(16), padding: responsiveWidth(16)}}>
      <MukCard title={t.do('main.settings.theme.title')}>
        <MukSegmented
          value={ui.appearance}
          onValueChange={value => ui.set('appearance', value as IAppearance)}
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
      </MukCard>
      <MukCard title={t.do('main.settings.language.title')}>
        <MukPicker<string>
          items={LanguageDict}
          name={'language'}
          value={ui.language}
          onValueChange={(_name, value) => t.setup(value as ILanguage)}
        />
      </MukCard>
      <MukCard title={'Bağlı Hesaplar'}>
        {Object.entries(connectedAccounts).map(([key, name]) => {
          const isConnected = auth.auths.some(value => value === key);
          return (
            <MukButton
              disabled={loading.clearAuth}
              label={isConnected ? `${name} hesabının bağlantısını kes` : `${name} hesabını bağla`}
              onPress={async () => {
                if (isConnected) {
                  await api.auths.clearAuth(key as IAuthsType);
                } else {
                  await api.auths.connectAccount(key as IAuthsType, name);
                }
              }}
            />
          );
        })}
      </MukCard>
    </SubLayout>
  );
});

import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {YedyCard, YedyPicker, YedySegmented, YedyText} from '../../components/custom';
import {_languages, IAppearance, IAuthsType, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {SubLayout} from '../../components/layouts/SubLayout';
import api from '../../services/api';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import SpotifyIcon from '../../components/spotify/SpotifyIcon';

const connectedAccounts: Record<string, string> = {SPOTIFY: 'Spotify'};

export default observer(() => {
  const {colors} = useTheme();
  const {ui, auth, loading} = useStores();
  const {t} = useServices();

  const LanguageDict = useMemo(
    () => ({..._languages, system: t.do('main.settings.language.system')}),
    [ui.getLanguage],
  );

  return (
    <SubLayout style={{gap: responsiveWidth(16), padding: responsiveWidth(16)}}>
      <YedyCard title={t.do('main.settings.theme.title')}>
        <YedySegmented
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
      </YedyCard>
      <YedyCard title={t.do('main.settings.language.title')}>
        <YedyPicker<string>
          items={LanguageDict}
          name={'language'}
          value={ui.language}
          onValueChange={(_name, value) => t.setup(value as ILanguage)}
        />
      </YedyCard>
      <YedyCard title={t.do('main.settings.connect.title')} contentStyle={{alignItems: 'flex-start'}}>
        {Object.entries(connectedAccounts).map(([key, name]) => {
          const isConnected = auth.auths.some(value => value.type === key);
          return (
            <TouchableOpacity
              key={key}
              disabled={loading.clearAuth || loading.connectAccount}
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={async () => {
                if (isConnected) {
                  await api.auths.clearAuth(key as IAuthsType);
                } else {
                  await api.auths.connectAccount(key as IAuthsType, name);
                }
              }}
            >
              <ActivityIndicator
                size={responsiveSize(12)}
                color={colors.primary}
                style={{
                  display: loading.clearAuth || loading.connectAccount ? undefined : 'none',
                  marginRight: responsiveWidth(8),
                }}
              />
              <SpotifyIcon scale={1.3} noText disabled />
              <YedyText size={14}>
                {t.do(
                  isConnected
                    ? `main.settings.connect.${name.toLowerCase()}.disconnect`
                    : (`main.settings.connect.${name.toLowerCase()}.connect` as any),
                )}
              </YedyText>
            </TouchableOpacity>
          );
        })}
      </YedyCard>
    </SubLayout>
  );
});

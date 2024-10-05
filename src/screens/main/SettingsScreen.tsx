import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import {useServices} from '../../services';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import MukPicker from '../../components/custom/MukPicker';
import {_languages, IAppearance, IAuthsType, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import MukCard from '../../components/custom/MukCard';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukSegmented from '../../components/custom/MukSegmented';
import {SubLayout} from '../../components/layouts/SubLayout';
import api from '../../services/api';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import SpotifyIcon from '../../components/spotify/SpotifyIcon';

const connectedAccounts: Record<string, string> = {SPOTIFY: 'Spotify'};

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {ui, auth, loading} = useStores();
  const {t} = useServices();

  const LanguageDict = useMemo(
    () => ({..._languages, system: t.do('main.settings.language.system')}),
    [ui.getLanguage],
  );

  return (
    <SubLayout style={{gap: responsiveWidth(16), padding: responsiveWidth(16)}}>
      <MukCard key={'theme'} title={t.do('main.settings.theme.title')}>
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
      <MukCard key={'language'} title={t.do('main.settings.language.title')}>
        <MukPicker<string>
          items={LanguageDict}
          name={'language'}
          value={ui.language}
          onValueChange={(_name, value) => t.setup(value as ILanguage)}
        />
      </MukCard>
      <MukCard key={'accounts'} title={t.do('main.settings.connect.title')} contentStyle={{alignItems: 'flex-start'}}>
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
              <Text style={{color: colors.secondary, fontWeight: '400', fontSize: responsiveSize(16)}}>
                {t.do(
                  isConnected
                    ? `main.settings.connect.${name.toLowerCase()}.disconnect`
                    : (`main.settings.connect.${name.toLowerCase()}.connect` as any),
                )}
              </Text>
            </TouchableOpacity>
          );
        })}
      </MukCard>
    </SubLayout>
  );
});

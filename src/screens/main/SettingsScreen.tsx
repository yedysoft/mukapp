import {observer} from 'mobx-react';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {YedyCard, YedyPicker, YedySegmented} from '../../components/custom';
import {_languages, IAppearance, ILanguage} from '../../types/enums';
import {useMemo} from 'react';
import {responsiveWidth} from '../../utils/util';
import {SubLayout} from '../../components/layouts/SubLayout';

//const connectedAccounts: Record<string, string> = {YEDY: 'yedy'};

export default observer(() => {
  //const {colors} = useTheme();
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
      {/*<YedyCard title={t.do('main.settings.connect.title')} contentStyle={{alignItems: 'flex-start'}}>
            {Object.entries(connectedAccounts).map(([key, name]) => {
                const isConnected = auth.auths.some(value => value.type === key);
                return (
                    <YedyButton
                        key={key}
                        buttonStyle={{paddingVertical: 0, paddingHorizontal: 0, gap: 0, backgroundColor: 'transparent'}}
                        textStyle={{color: colors.secondary, fontSize: responsiveSize(14)}}
                        label={t.do(
                            `main.settings.connect.${key.toLowerCase()}.${isConnected ? 'disconnect' : 'connect'}` as any,
                        )}
                        loading={loading.clearAuth || loading.connectAccount}
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
        </YedyCard>*/}
    </SubLayout>
  );
});

import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import YedyTextInput from '../custom/YedyTextInput';
import MukButton from '../custom/MukButton';
import {useRef} from 'react';
import {useServices} from '../../services';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import {ILogin} from '../../types/auth';
import SpotifyIcon from '../spotify/SpotifyIcon';
import YedyText from '../custom/YedyText';

export const AuthLoginForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading, ui} = useStores();
  const formRef = useRef<MukFormRef<ILogin>>(null);
  const formData: ILogin = {name: ui.name, pass: ui.pass};

  const handleSubmit = () => {
    ui.setMany({
      name: formRef.current?.formData('name') as string,
      pass: formRef.current?.formData('pass') as string,
    });
    formRef.current?.validateInputs() && api.auth.login(formRef.current?.formData() as ILogin);
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{gap: responsiveHeight(48)}}>
        <YedyText fontType={'bold'} fontSize={32}>
          {t.do('auth.login.title')}
        </YedyText>
        <View style={{gap: responsiveWidth(8)}}>
          <MukForm ref={formRef} onSubmit={handleSubmit} data={formData}>
            <YedyTextInput name={'name'} label={t.do('auth.login.username')} preValidate={'required'} />
            <YedyTextInput
              name={'pass'}
              label={t.do('auth.login.password')}
              secureTextEntry={true}
              preValidate={'required'}
              validate={[value => String(value).length >= 3 && String(value).length <= 32]}
              validationMessage={['Şifre 3 ile 32 karakter arasında olmalıdır.']}
            />
          </MukForm>
          <MukButton
            buttonStyle={{
              backgroundColor: 'transparent',
              padding: 0,
              alignSelf: 'flex-end',
              marginVertical: responsiveWidth(16),
            }}
            textStyle={{fontSize: responsiveSize(14), color: colors.outlineVariant}}
            loading={loading.getLogin}
            label={t.do('auth.login.changePassword')}
            onPress={() => navigation.navigate('Forgot')}
          />
          <TouchableOpacity
            disabled={loading.connectAccount}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.shadow,
              borderRadius: 16,
            }}
            onPress={() => api.auths.connectAccount('SPOTIFY', 'Spotify', true)}
          >
            <ActivityIndicator
              size={responsiveSize(12)}
              color={colors.primary}
              style={{display: loading.connectAccount ? undefined : 'none', marginRight: responsiveWidth(8)}}
            />
            <SpotifyIcon scale={1.3} noText disabled />
            <YedyText fontSize={16}>{t.do('auth.login.spotify')}</YedyText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{backgroundColor: 'transparent', padding: 0}}
          textStyle={{color: colors.outlineVariant}}
          disabled={loading.getLogin}
          label={t.do('auth.login.toRegister')}
          onPress={() => navigation.navigate('Register')}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getLogin}
          label={t.do('auth.login.submit')}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
});

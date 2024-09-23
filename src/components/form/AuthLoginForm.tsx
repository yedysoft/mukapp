import {observer} from 'mobx-react';
import {Divider, Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useRef} from 'react';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import {ILogin} from '../../types/auth';

export const AuthLoginForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading, ui} = useStores();
  const formRef = useRef<MukFormRef<ILogin>>(null);
  const formData: ILogin = {name: 'eto', pass: '123', expoToken: ui.getExpoToken};

  const handleSubmit = () => formRef.current?.validateInputs() && api.auth.login(formRef.current?.formData() as ILogin);

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300', color: colors.secondary}}>
          {t.do('auth.login.title')}
        </Text>
        <View style={{gap: responsiveWidth(8)}}>
          <MukForm ref={formRef} onSubmit={handleSubmit} data={formData}>
            <MukTextInput name={'name'} label={t.do('auth.login.username')} preValidate={'required'} />
            <MukTextInput
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
            }}
            textStyle={{color: colors.outlineVariant, fontWeight: '400', fontSize: responsiveSize(14)}}
            loading={loading.getLogin}
            label={t.do('auth.login.changePassword')}
            onPress={() => navigation.navigate('Forgot')}
          />
          <Divider />
          <MukButton
            textStyle={{fontWeight: '600'}}
            label={'Spotify İle Giriş Yap'}
            onPress={() => api.auths.connectAccount('SPOTIFY', 'Spotify')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{backgroundColor: 'transparent', padding: 0}}
          textStyle={{color: colors.outlineVariant, fontWeight: '400'}}
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
    </SafeAreaView>
  );
});

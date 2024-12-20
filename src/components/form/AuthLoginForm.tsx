import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {YedyButton, YedyForm, YedyFormRef, YedyText, YedyTextInput} from '../custom';
import {useRef} from 'react';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import {ILogin} from '../../types/auth';
import PrivacyPolicy from '../ps/PrivacyPolicy';

export const AuthLoginForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading, ui} = useStores();
  const formRef = useRef<YedyFormRef<ILogin>>(null);
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
        <YedyText type={'bold'} size={26}>
          {t.do('auth.login.title')}
        </YedyText>
        <View style={{gap: responsiveWidth(8)}}>
          <YedyForm ref={formRef} onSubmit={handleSubmit} data={formData}>
            <YedyTextInput name={'name'} label={t.do('auth.login.username')} preValidate={'required'}/>
            <YedyTextInput
              name={'pass'}
              label={t.do('auth.login.password')}
              secureTextEntry={true}
              preValidate={'required'}
              validate={[value => String(value).length >= 3 && String(value).length <= 32]}
              validationMessage={['Şifre 3 ile 32 karakter arasında olmalıdır.']}
            />
          </YedyForm>
          <View style={{gap: responsiveWidth(16), paddingTop: responsiveWidth(4), paddingHorizontal: responsiveWidth(4)}}>
            <PrivacyPolicy name={'auth.login'}/>
            <YedyButton
              buttonStyle={{
                backgroundColor: 'transparent',
                paddingVertical: 0,
                paddingHorizontal: 0,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
              disabled={loading.login || loading.connectAccount}
              textStyle={{fontSize: responsiveSize(12), color: colors.outlineVariant}}
              label={t.do('auth.login.changePassword')}
              onPress={() => navigation.navigate('Forgot')}
            />
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <YedyButton
          buttonStyle={{backgroundColor: 'transparent', paddingHorizontal: 0, marginLeft: responsiveWidth(8)}}
          textStyle={{color: colors.outlineVariant}}
          disabled={loading.login || loading.connectAccount}
          label={t.do('auth.login.toRegister')}
          onPress={() => navigation.navigate('Register')}
        />
        <YedyButton
          loading={loading.login}
          disabled={loading.connectAccount}
          label={t.do('auth.login.submit')}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
});

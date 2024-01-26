import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useRef, useState} from 'react';
import {ILogin} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {stores, useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';

export const AuthLoginForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123', expoToken: stores.ui.getExpoToken});
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef>(null);

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>{t.do('auth.login.title')}</Text>
        <View style={{gap: responsiveWidth(8)}}>
          <MukForm ref={formRef}>
            <MukTextInput
              name={'name'}
              label={t.do('auth.login.username')}
              value={form.name}
              onCustomChange={handleOnChange}
              preValidate={'required'}
            />
            <MukTextInput
              name={'pass'}
              label={t.do('auth.login.password')}
              value={form.pass}
              secureTextEntry={true}
              onCustomChange={handleOnChange}
              preValidate={'required'}
              validate={[value => value.length >= 3 && value.length <= 32]}
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
          onPress={() => {
            if (formRef.current?.validateInputs()) {
              api.auth.login(form);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
});

import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {YedyButton, YedyForm, YedyFormRef, YedyText, YedyTextInput} from '../custom';
import React, {useRef} from 'react';
import {IRegister} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../navigation/AuthStack';

export const AuthRegisterForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<YedyFormRef<IRegister>>(null);
  const formData: IRegister = {email: '', userName: '', userPass: '', name: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.register(formRef.current?.formData() as IRegister);

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{flex: 1, gap: responsiveHeight(28)}}>
        <YedyText type={'bold'} size={26}>
          {t.do('auth.register.title')}
        </YedyText>
        <YedyForm ref={formRef} onSubmit={onSubmit} data={formData}>
          <YedyTextInput name={'name'} label={t.do('auth.register.name')} preValidate={'required'} />
          <YedyTextInput name={'userName'} label={t.do('auth.register.username')} preValidate={'required'} />
          <YedyTextInput
            name={'email'}
            label={t.do('auth.register.email')}
            inputMode={'email'}
            preValidate={'required'}
          />
          <YedyTextInput
            name={'userPass'}
            label={t.do('auth.register.password')}
            secureTextEntry={true}
            preValidate={'required'}
            validate={[value => String(value).length >= 8 && String(value).length <= 32]}
            validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
          />
          <YedyTextInput
            name={'repass'}
            label={t.do('auth.register.repassword')}
            secureTextEntry={true}
            preValidate={'required'}
            validate={[
              value => String(value).length >= 8 && String(value).length <= 32,
              value => value === formRef.current?.formData('userPass'),
            ]}
            validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
            isFormElement={false}
          />
        </YedyForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <YedyButton
          buttonStyle={{backgroundColor: 'transparent'}}
          textStyle={{color: colors.outlineVariant}}
          disabled={loading.getRegister}
          label={t.do('auth.register.toLogin')}
          onPress={() => navigation.navigate('Login')}
        />
        <YedyButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getRegister}
          label={t.do('auth.register.submit')}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
});

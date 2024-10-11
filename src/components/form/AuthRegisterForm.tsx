import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef} from 'react';
import {IRegister} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import YedyText from '../custom/YedyText';

export const AuthRegisterForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef<IRegister>>(null);
  const formData: IRegister = {email: '', userName: '', userPass: '', name: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.register(formRef.current?.formData() as IRegister);

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{gap: responsiveHeight(48)}}>
        <YedyText fontType={'bold'} fontSize={32}>
          {t.do('auth.register.title')}
        </YedyText>
        <MukForm ref={formRef} onSubmit={onSubmit} data={formData}>
          <MukTextInput name={'name'} label={t.do('auth.register.name')} preValidate={'required'} />
          <MukTextInput name={'userName'} label={t.do('auth.register.username')} preValidate={'required'} />
          <MukTextInput
            name={'email'}
            label={t.do('auth.register.email')}
            inputMode={'email'}
            preValidate={'required'}
          />
          <MukTextInput
            name={'userPass'}
            label={t.do('auth.register.password')}
            secureTextEntry={true}
            preValidate={'required'}
            validate={[value => String(value).length >= 8 && String(value).length <= 32]}
            validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
          />
          <MukTextInput
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
        </MukForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{backgroundColor: 'transparent'}}
          textStyle={{color: colors.outlineVariant}}
          disabled={loading.getRegister}
          label={t.do('auth.register.toLogin')}
          onPress={() => navigation.navigate('Login')}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getRegister}
          label={t.do('auth.register.submit')}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
});

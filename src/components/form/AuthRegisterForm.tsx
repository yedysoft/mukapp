import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef, useState} from 'react';
import {IRegister} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import MukPicker from '../custom/MukPicker';
import MukDatePicker from '../custom/MukDatePicker';

export const AuthRegisterForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading} = useStores();
  const [step, setStep] = useState(0);
  const [displayPicker, setDisplayPicker] = useState<string | undefined>(undefined);
  const formRef = useRef<MukFormRef<IRegister>>(null);
  const formData: IRegister = {email: '', userName: '', userPass: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.register(formRef.current?.formData() as IRegister);

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300', color: colors.secondary}}>
          {t.do('auth.register.title')}
        </Text>
        <MukForm ref={formRef} onSubmit={onSubmit} data={formData}>
          <MukTextInput
            name={'name'}
            label={t.do('auth.register.name')}
            preValidate={'required'}
            visible={step === 0}
          />
          <MukTextInput
            name={'surname'}
            label={t.do('auth.register.surname')}
            preValidate={'required'}
            visible={step === 0}
          />
          <MukTextInput
            name={'birthday'}
            label={t.do('auth.register.birthday')}
            selectionColor={colors.background}
            showKeyboard={false}
            visible={step === 0}
            preValidate={'required'}
            onFocus={() => setDisplayPicker('birthday')}
            onBlur={() => setDisplayPicker(undefined)}
          />
          <MukTextInput
            name={'gender'}
            label={t.do('auth.register.gender')}
            selectionColor={colors.background}
            showKeyboard={false}
            visible={step === 0}
            preValidate={'required'}
            onFocus={() => setDisplayPicker('gender')}
            onBlur={() => setDisplayPicker(undefined)}
          />
          <MukTextInput
            name={'email'}
            label={t.do('auth.register.email')}
            inputMode={'email'}
            preValidate={'required'}
            visible={step === 1}
          />
          <MukTextInput
            name={'userName'}
            label={t.do('auth.register.username')}
            preValidate={'required'}
            visible={step === 1}
          />
          <MukTextInput
            name={'telNumber'}
            label={t.do('auth.register.phone')}
            inputMode={'tel'}
            preValidate={'required'}
            visible={step === 1}
          />
          <MukTextInput
            name={'userPass'}
            label={t.do('auth.register.password')}
            secureTextEntry={true}
            preValidate={'required'}
            validate={[value => value.length >= 8 && value.length <= 32]}
            validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
            visible={step === 2}
          />
          <MukTextInput
            name={'repass'}
            label={t.do('auth.register.repassword')}
            secureTextEntry={true}
            preValidate={'required'}
            validate={[
              value => value.length >= 8 && value.length <= 32,
              value => value === formRef.current?.formData('userPass'),
            ]}
            validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
            visible={step === 2}
          />
        </MukForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{
            backgroundColor: step === 0 ? 'transparent' : colors.backdrop,
            paddingHorizontal: step === 0 ? 0 : responsiveWidth(32),
            paddingVertical: step === 0 ? 0 : responsiveWidth(16),
          }}
          textStyle={{color: step === 0 ? colors.outlineVariant : colors.secondary, fontWeight: '400'}}
          disabled={loading.getRegister}
          label={step === 0 ? t.do('auth.register.toLogin') : t.do('auth.register.prev')}
          onPress={() => (step === 0 ? navigation.navigate('Login') : setStep(step - 1))}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getRegister}
          label={step === 2 ? t.do('auth.register.submit') : t.do('auth.register.next')}
          onPress={() => {
            if (step === 2) {
              onSubmit();
            } else {
              setStep(step + 1);
            }
          }}
        />
      </View>
      <View
        style={{
          display: displayPicker ? undefined : 'none',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: responsiveHeight(160),
          marginTop: responsiveHeight(-100),
        }}
      >
        {displayPicker === 'birthday' ? (
          <MukDatePicker
            name={'birthday'}
            value={formRef.current ? (formRef.current.formData('birthday') as string) : ''}
            onValueChange={() => {}}
          />
        ) : (
          displayPicker === 'gender' && (
            <MukPicker<string>
              name={'gender'}
              items={[
                t.do('auth.register.genders.male'),
                t.do('auth.register.genders.female'),
                t.do('auth.register.genders.other'),
              ]}
              value={formRef.current ? (formRef.current.formData('gender') as string) : ''}
              onValueChange={() => {}}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
});

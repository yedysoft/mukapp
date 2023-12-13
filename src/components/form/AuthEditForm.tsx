import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef, useState} from 'react';
import {IEdit} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import MukPicker from '../custom/MukPicker';
import MukDatePicker from '../custom/MukDatePicker';

export const AuthEditForm = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef>(null);
  const [form, setForm] = useState<IEdit>({email: '', userName: '', userPass: ''});
  const [displayPicker, setDisplayPicker] = useState<string | undefined>(undefined);

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>{t.do('auth.register.title')}</Text>
        <View style={{}}>
          <MukForm ref={formRef}>
            <MukTextInput
              name={'name'}
              label={t.do('auth.register.name')}
              value={form.name}
              onChange={handleOnChange}
              preValidate={'required'}
            />
            <MukTextInput
              name={'surname'}
              label={t.do('auth.register.surname')}
              value={form.surname}
              onChange={handleOnChange}
              preValidate={'required'}
            />
            <MukTextInput
              name={'userName'}
              label={t.do('auth.register.username')}
              value={form.userName}
              onChange={handleOnChange}
              preValidate={'required'}
            />
            <MukTextInput
              name={'email'}
              label={t.do('auth.register.email')}
              inputMode={'email'}
              value={form.email}
              onChange={handleOnChange}
              preValidate={'required'}
            />
            <MukTextInput
              name={'userPass'}
              label={t.do('auth.register.password')}
              value={form.userPass}
              hideText={true}
              onChange={handleOnChange}
              preValidate={'required'}
              validate={[value => value.length >= 8 && value.length <= 32]}
              validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
            />
            <MukTextInput
              name={'repass'}
              label={t.do('auth.register.repassword')}
              hideText={true}
              preValidate={'required'}
              validate={[value => value.length >= 8 && value.length <= 32, value => value === form.userPass]}
              validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
            />
            <MukTextInput
              name={'telNumber'}
              label={t.do('auth.register.phone')}
              inputMode={'tel'}
              value={form.telNumber}
              preValidate={'required'}
              onChange={handleOnChange}
              disabled
            />
            <MukTextInput
              name={'gender'}
              label={t.do('auth.register.gender')}
              value={form.gender?.toString()}
              selectionColor={colors.background}
              showKeyboard={false}
              preValidate={'required'}
              onFocus={() => setDisplayPicker('gender')}
              onBlur={() => setDisplayPicker(undefined)}
              disabled
            />
            <MukTextInput
              name={'birthday'}
              label={t.do('auth.register.birthday')}
              value={form.birthday}
              selectionColor={colors.background}
              showKeyboard={false}
              preValidate={'required'}
              onFocus={() => setDisplayPicker('birthday')}
              onBlur={() => setDisplayPicker(undefined)}
              disabled
            />
          </MukForm>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getRegister}
          label={t.do('auth.edit.submit')}
          onPress={() => formRef.current?.validateInputs() && api.auth.register(form)}
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
          <MukDatePicker name={'birthday'} value={form.birthday} onValueChange={handleOnChange} />
        ) : (
          displayPicker === 'gender' && (
            <MukPicker<string>
              name={'gender'}
              items={[
                t.do('auth.register.genders.male'),
                t.do('auth.register.genders.female'),
                t.do('auth.register.genders.other'),
              ]}
              value={form.gender?.toString()}
              onValueChange={handleOnChange}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
});

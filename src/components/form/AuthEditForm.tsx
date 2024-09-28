import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef} from 'react';
import {IEdit} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import MukImage from '../custom/MukImage';
import {_gender} from '../../types/enums';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading, user, auth} = useStores();
  const formRef = useRef<MukFormRef<IEdit>>(null);
  const form: IEdit = {email: '', userName: '', userPass: ''};

  const onSubmit = () => formRef.current?.validateInputs() && api.auth.register(formRef.current?.formData() as IEdit);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: responsiveWidth(16),
        paddingBottom: responsiveWidth(32),
      }}
    >
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <MukImage
          isEdit={true}
          tableName={'S_USER'}
          tableId={user.getInfo.id}
          setImage={image => user.set('info', v => ({...v, image}))}
          scale={2.4}
          source={
            user.getInfo.image
              ? {uri: `${user.getInfo.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
          style={{
            borderWidth: responsiveSize(4),
            borderColor: colors.primary,
            borderRadius: 100,
          }}
        />
      </View>
      <MukForm ref={formRef} onSubmit={onSubmit} data={form}>
        <MukTextInput name={'name'} label={t.do('auth.register.name')} preValidate={'required'} />
        <MukTextInput name={'surname'} label={t.do('auth.register.surname')} preValidate={'required'} />
        <MukTextInput name={'userName'} label={t.do('auth.register.username')} preValidate={'required'} />
        <MukTextInput name={'email'} label={t.do('auth.register.email')} inputMode={'email'} preValidate={'required'} />
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
        <MukTextInput
          name={'telNumber'}
          label={t.do('auth.register.phone')}
          inputMode={'tel'}
          preValidate={'required'}
        />
        <MukTextInput
          name={'gender'}
          label={t.do('auth.register.gender')}
          isPicker={true}
          pickerItems={api.helper.arrayToMap<string>(_gender, 'gender')}
          preValidate={'required'}
        />
        <MukTextInput
          name={'birthday'}
          label={t.do('auth.register.birthday')}
          isPicker={true}
          pickerType={'date'}
          preValidate={'required'}
          datePickerMinMax={{max: new Date().getFullYear() - 17}}
        />
      </MukForm>
      <MukButton
        buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
        loading={loading.getRegister}
        label={t.do('auth.edit.submit')}
        onPress={onSubmit}
      />
    </View>
  );
});

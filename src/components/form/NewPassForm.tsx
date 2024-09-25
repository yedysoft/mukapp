import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef} from 'react';
import {IPassChange} from '../../types/auth';
import {useServices} from '../../services';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {loading} = useStores();
  const {api, t} = useServices();
  const formRef = useRef<MukFormRef<IPassChange>>(null);
  const formData: IPassChange = {oldPass: 'temp', newPass: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() &&
    api.user.passChange(formRef.current?.formData() as IPassChange).then(api.auth.checkToken);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: responsiveWidth(16),
        paddingTop: responsiveHeight(32),
      }}
    >
      <Text style={{fontSize: responsiveSize(32), fontWeight: '300', color: colors.secondary}}>
        {t.do('form.newPass.title')}
      </Text>
      <MukForm ref={formRef} onSubmit={onSubmit} data={formData}>
        <MukTextInput
          name={'newPass'}
          label={t.do('form.newPass.newPass')}
          secureTextEntry={true}
          preValidate={'required'}
          validate={[value => String(value).length >= 8 && String(value).length <= 32]}
          validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
        />
        <MukTextInput
          name={'repass'}
          label={t.do('form.newPass.reNewPass')}
          secureTextEntry={true}
          preValidate={'required'}
          validate={[
            value => String(value).length >= 8 && String(value).length <= 32,
            value => value === formRef.current?.formData('newPass'),
          ]}
          validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
        />
      </MukForm>
      <MukButton
        buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
        loading={loading.getRegister}
        label={t.do('form.newPass.submit')}
        onPress={onSubmit}
      />
    </SafeAreaView>
  );
});

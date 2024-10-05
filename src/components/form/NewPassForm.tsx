import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef} from 'react';
import {IPassChange} from '../../types/auth';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {View} from 'react-native';
import MukIconButton from '../custom/MukIconButton';
import YedyText from '../custom/YedyText';

export default observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {loading} = useStores();
  const {api, t} = useServices();
  const formRef = useRef<MukFormRef<IPassChange>>(null);
  const formData: IPassChange = {oldPass: 'temp', newPass: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() &&
    api.user.passChange(formRef.current?.formData() as IPassChange).then(async () => {
      loading.set('passChange', true);
      await api.auth.checkToken();
      loading.set('passChange', true);
    });

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: responsiveWidth(16)}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <YedyText fontType={'bold'} fontSize={32}>
          {t.do('form.newPass.title')}
        </YedyText>
        <MukIconButton icon={'log-out'} onPress={api.auth.logout} scale={0.5} color={colors.error} />
      </View>
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
        buttonStyle={{paddingVertical: responsiveWidth(16)}}
        loading={loading.passChange}
        label={t.do('form.newPass.submit')}
        onPress={onSubmit}
      />
    </View>
  );
});

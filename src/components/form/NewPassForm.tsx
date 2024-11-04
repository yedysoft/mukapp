import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {YedyButton, YedyForm, YedyFormRef, YedyIconButton, YedyText, YedyTextInput} from '../custom';
import React, {useRef} from 'react';
import {IPassChange} from '../../types/auth';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {View} from 'react-native';

export default observer(() => {
  const {colors} = useTheme();
  const {loading} = useStores();
  const {api, t} = useServices();
  const formRef = useRef<YedyFormRef<IPassChange>>(null);
  const formData: IPassChange = {oldPass: 'temp', newPass: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() &&
    api.user.passChange(formRef.current?.formData() as IPassChange).then(async () => {
      loading.set('passChange', true);
      await api.auth.checkToken();
      loading.set('passChange', false);
    });

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: responsiveWidth(16)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <YedyText type={'bold'} size={26}>
          {t.do('form.newPass.title')}
        </YedyText>
        <YedyIconButton
          icon={'logout'}
          disabled={loading.passChange}
          onPress={api.auth.logout}
          scale={0.5}
          color={colors.error}
        />
      </View>
      <YedyForm ref={formRef} onSubmit={onSubmit} data={formData} style={{flex: 1}}>
        <YedyTextInput
          name={'newPass'}
          label={t.do('form.newPass.newPass')}
          secureTextEntry={true}
          preValidate={'required'}
          validate={[value => String(value).length >= 8 && String(value).length <= 32]}
          validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
        />
        <YedyTextInput
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
      </YedyForm>
      <YedyButton loading={loading.passChange} label={t.do('form.newPass.submit')} onPress={onSubmit} />
    </View>
  );
});

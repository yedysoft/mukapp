import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {YedyButton, YedyForm, YedyFormRef, YedyText, YedyTextInput} from '../custom';
import {useRef} from 'react';
import {IForgot} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../navigation/AuthStack';

export const AuthForgotForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<YedyFormRef<IForgot>>(null);
  const form: IForgot = {name: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.forgotPass(formRef.current?.formData() as IForgot);

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', gap: responsiveWidth(20)}}>
      <View style={{flex: 1, gap: responsiveHeight(48)}}>
        <YedyText type={'bold'} size={26}>
          {t.do('auth.forgot.title')}
        </YedyText>
        <YedyForm ref={formRef} onSubmit={onSubmit} data={form} style={{flex: 1}}>
          <YedyTextInput
            name={'name'}
            label={t.do('auth.forgot.email')}
            preValidate={'required'}
            validate={[value => String(value).length >= 3]}
            validationMessage={['En az 3 karakter olmalıdır.']}
          />
        </YedyForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <YedyButton
          buttonStyle={{backgroundColor: colors.shadow}}
          textStyle={{color: colors.secondary}}
          disabled={loading.getForgotPass}
          label={t.do('auth.forgot.back')}
          onPress={() => navigation.navigate('Login')}
        />
        <YedyButton loading={loading.getForgotPass} label={t.do('auth.forgot.submit')} onPress={onSubmit} />
      </View>
    </View>
  );
});

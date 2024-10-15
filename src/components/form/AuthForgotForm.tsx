import {observer} from 'mobx-react';
import useTheme from '../../hooks/useTheme';
import YedyTextInput from '../custom/YedyTextInput';
import MukButton from '../custom/MukButton';
import {useRef} from 'react';
import {IForgot} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import YedyText from '../custom/YedyText';

export const AuthForgotForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef<IForgot>>(null);
  const form: IForgot = {name: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.forgotPass(formRef.current?.formData() as IForgot);

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{gap: responsiveHeight(48)}}>
        <YedyText fontType={'bold'} fontSize={32}>
          {t.do('auth.forgot.title')}
        </YedyText>
        <MukForm ref={formRef} onSubmit={onSubmit} data={form}>
          <YedyTextInput
            name={'name'}
            label={t.do('auth.forgot.email')}
            preValidate={'required'}
            validate={[value => String(value).length >= 3]}
            validationMessage={['En az 3 karakter olmalıdır.']}
          />
        </MukForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{
            backgroundColor: colors.backdrop,
            paddingHorizontal: responsiveWidth(32),
            paddingVertical: responsiveWidth(16),
          }}
          textStyle={{color: colors.secondary}}
          disabled={loading.getForgotPass}
          label={t.do('auth.forgot.back')}
          onPress={() => navigation.navigate('Login')}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getForgotPass}
          label={t.do('auth.forgot.submit')}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
});
